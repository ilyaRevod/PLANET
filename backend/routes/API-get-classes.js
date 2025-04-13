const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const cookieParser = require("cookie-parser");

router.use(cookieParser());

// Router
const { getUser } = require('./API-auth-login');

const BASE_URL = 'https://educ.naghshejahan.ac.ir';
// const SCHEDULE_URL = 'https://educ.naghshejahan.ac.ir/student/selectunit/lesson.aspx';
const WEEKLY_SCHEDULE = 'https://educ.naghshejahan.ac.ir/student/program/weeklyprogram.aspx';
const NEW_LOGON = 'https://educ.naghshejahan.ac.ir/newlogon.aspx';
/* PAYLOAD
const response = await axios.post(
  NEW_LOGON,
  new URLSearchParams({
    __VIEWSTATE: ,
    __VIEWSTATEGENERATOR: ,
    __EVENTVALIDATION: ,
    pageUnderCons: 0,
    btnOK: 'ورود دوباره'
  }),
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': sessionCookie,
      'User-Agent': 'Mozilla/5.0',
      'Referer': BASE_URL
    }
  }
);
*/
let sessionCookie;

router.get('/', async (req, res) => {
  const user = await getUser(); // Get user data
  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const response = await axios.get(BASE_URL);
    const cookie = response.headers["set-cookie"];
    if (!cookie) {
      return res.status(401).json({ error: 'Cookie not found' });
    } else {
      sessionCookie = cookie.map(cookie => cookie.split(";")[0]).join("; ");
    }

    const $ = cheerio.load(response.data);
    const viewState = $("#__VIEWSTATE").val();
    const viewStateGenerator = $("#__VIEWSTATEGENERATOR").val();
    const eventValidation = $("#__EVENTVALIDATION").val();

    const loginData = new URLSearchParams({
      __EVENTTARGET: "btnLogin",
      __EVENTARGUMENT: "",
      __VIEWSTATE: viewState,
      __VIEWSTATEGENERATOR: viewStateGenerator,
      __EVENTVALIDATION: eventValidation,
      pageUnderCons: "0",
      tbxName: user.studentId,
      tbxPass: user.password,
      drpType: "1",
      hdnJavaScript: "ok",
    });

    const loginResponse = await axios.post(BASE_URL, loginData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": sessionCookie,
        "Origin": BASE_URL,
        "Referer": BASE_URL + '/',
        "User-Agent": "Mozilla/5.0"
      }
    });

    const schedulePage = await axios.get(WEEKLY_SCHEDULE, {
      headers: {
        "Cookie": sessionCookie,
        "Referer": BASE_URL + '/',
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $1 = cheerio.load(schedulePage.data);
    const schedulePageViewState = $1("#__VIEWSTATE").val();
    const schedulePageViewStateGenerator = $1("#__VIEWSTATEGENERATOR").val();
    const schedulePageEventValidation = $1("#__EVENTVALIDATION").val();

    if (!schedulePageViewState || !schedulePageViewStateGenerator || !schedulePageEventValidation) {
      return res.status(500).json({ error: 'Failed to get schedule page data' });
    }

    const scheduleResponse = await axios.post(
      WEEKLY_SCHEDULE,
      new URLSearchParams({
        __VIEWSTATE: schedulePageViewState,
        __VIEWSTATEGENERATOR: schedulePageViewStateGenerator,
        __EVENTVALIDATION: schedulePageEventValidation,
        ctl00$CPH2$drpTerm: '14032',
        ctl00$CPH2$btnView: 'مشاهده'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': sessionCookie,
          'User-Agent': 'Mozilla/5.0',
          'Referer': BASE_URL
        }
      }
    );

    const $2 = cheerio.load(scheduleResponse.data);
    const rows = $2('#ctl00_CPH2_program tr').slice(1);
    const lessons = [];
    let currentDay = '';
    const dayMap = {
      'شنبه': 'saturday',
      'یکشنبه': 'sunday',
      'يكشنبه': 'sunday',
      'دوشنبه': 'monday',
      'سه شنبه': 'tuesday',
      'چهارشنبه': 'wednesday',
      'پنجشنبه': 'thursday',
      'جمعه': 'friday',
    };
    const colorPalette = ['#4F46E5', '#16A34A', '#DC2626', '#F59E0B', '#0EA5E9', '#D946EF'];

    rows.each((index, row) => {
      const columns = $(row).find('td');
      if ($(columns[0]).attr('rowspan')) {
        currentDay = $(columns[0]).text().trim();
      }
      const isContinuation = !$(columns[0]).attr('rowspan') && columns.length === 9;
      const offset = isContinuation ? 0 : 1;
      const rawTime = $(columns[6 + offset]).text().trim();
      const [startTime, endTime] = rawTime.split('-').map(str => str.trim());
      const location = $(columns[5 + offset]).text().trim();
      const roomMatch = location.match(/كلاس\s+(.*)/i);
      const room = roomMatch ? roomMatch[1].trim() : location;
      lessons.push({
        id: `class${index + 1}`,
        professorName: $(columns[4 + offset]).text().trim(),
        className: $(columns[1 + offset]).text().trim(),
        day: dayMap[currentDay] || 'unknown',
        startTime,
        endTime,
        room,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)]
      });
    });

    if (lessons.length > 0) {
      res.json(lessons);
    } else {
      res.status(500).json({ error: 'No lessons found' });
    }
  } catch (error) {
    console.error("Error fetching schedule:", error.message);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

module.exports = router;
