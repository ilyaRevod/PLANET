const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const cookieParser = require("cookie-parser");

router.use(cookieParser());

const { getUser } = require('./API-auth-login');

const BASE_URL = 'https://educ.naghshejahan.ac.ir';
const LOGIN_URL = `${BASE_URL}/`;
const WEEKLY_SCHEDULE = `${BASE_URL}/student/program/weeklyprogram.aspx`;
const NEW_LOGON = `${BASE_URL}/newlogon.aspx`;
const LOGOUT = `${BASE_URL}/logout.aspx`;

let sessionCookie = '';

router.get('/', async (req, res) => {
    const user = await getUser();
    if (!user) {
        return res.status(401).json({ error: 'کاربر وارد نشده است' });
    }

    try {
        // Get initial cookies and tokens
        const homePageRes = await axios.get(LOGIN_URL);
        sessionCookie = homePageRes.headers["set-cookie"]
            .map(cookie => cookie.split(";")[0])
            .join("; ");

        const $ = cheerio.load(homePageRes.data);
        const viewState = $("#__VIEWSTATE").val();
        const viewStateGenerator = $("#__VIEWSTATEGENERATOR").val();
        const eventValidation = $("#__EVENTVALIDATION").val();

        // Do login
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
            hdnJavaScript: "ok"
        });

        const loginRes = await axios.post(LOGIN_URL, loginData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": sessionCookie,
                "Referer": LOGIN_URL,
                "User-Agent": "Mozilla/5.0"
            },
            maxRedirects: 0,
            validateStatus: status => status === 302 || status === 200
        });

        // Detect if redirected to newlogon.aspx
        if (loginRes.headers.location && loginRes.headers.location.includes('newlogon.aspx')) {
            const newLogonRes = await axios.get(NEW_LOGON, {
                headers: {
                    "Cookie": sessionCookie,
                    "User-Agent": "Mozilla/5.0",
                    "Referer": LOGIN_URL
                }
            });

            const $new = cheerio.load(newLogonRes.data);
            const v1 = $new("#__VIEWSTATE").val();
            const v2 = $new("#__VIEWSTATEGENERATOR").val();
            const v3 = $new("#__EVENTVALIDATION").val();

            const newLoginPayload = new URLSearchParams({
                __VIEWSTATE: v1,
                __VIEWSTATEGENERATOR: v2,
                __EVENTVALIDATION: v3,
                pageUnderCons: 0,
                btnOK: 'ورود دوباره'
            });

            await axios.post(NEW_LOGON, newLoginPayload, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cookie": sessionCookie,
                    "User-Agent": "Mozilla/5.0",
                    "Referer": NEW_LOGON
                }
            });
        }

        // Load weekly schedule page
        const scheduleGetRes = await axios.get(WEEKLY_SCHEDULE, {
            headers: {
                "Cookie": sessionCookie,
                "Referer": BASE_URL,
                "User-Agent": "Mozilla/5.0"
            }
        });

        const $schedulePage = cheerio.load(scheduleGetRes.data);
        const scheduleViewState = $schedulePage("#__VIEWSTATE").val();
        const scheduleViewStateGenerator = $schedulePage("#__VIEWSTATEGENERATOR").val();
        const scheduleEventValidation = $schedulePage("#__EVENTVALIDATION").val();

        if (!scheduleViewState || !scheduleEventValidation) {
            throw new Error('خطا در دریافت برنامه اولیه');
        }

        const schedulePostPayload = new URLSearchParams({
            __VIEWSTATE: scheduleViewState,
            __VIEWSTATEGENERATOR: scheduleViewStateGenerator,
            __EVENTVALIDATION: scheduleEventValidation,
            'ctl00$CPH2$drpTerm': '14032',
            'ctl00$CPH2$btnView': 'مشاهده'
        });

        const schedulePostRes = await axios.post(WEEKLY_SCHEDULE, schedulePostPayload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': sessionCookie,
                'User-Agent': 'Mozilla/5.0',
                'Referer': WEEKLY_SCHEDULE
            }
        });

        // Parse schedule table
        const $data = cheerio.load(schedulePostRes.data);
        const rows = $data('#ctl00_CPH2_program tr').slice(1);
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
        const colors = ['#4F46E5', '#16A34A', '#DC2626', '#F59E0B', '#0EA5E9', '#D946EF'];

        rows.each((i, row) => {
            const cols = $data(row).find('td');
            if ($data(cols[0]).attr('rowspan')) {
                currentDay = $data(cols[0]).text().trim();
            }
            const isContinued = !($data(cols[0]).attr('rowspan')) && cols.length === 9;
            const offset = isContinued ? 0 : 1;

            const rawTime = $data(cols[6 + offset]).text().trim();
            const [startTime, endTime] = rawTime.split('-').map(s => s.trim());
            const location = $data(cols[5 + offset]).text().trim();
            const room = location.includes('كلاس') ? location.split('كلاس')[1].trim() : location;

            lessons.push({
                id: `class-${i + 1}`,
                day: dayMap[currentDay] || 'unknown',
                className: $data(cols[1 + offset]).text().trim(),
                professorName: $data(cols[4 + offset]).text().trim(),
                room,
                startTime,
                endTime,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        });

        // Logout user
        try {
            await axios.get(LOGOUT, {
                headers: {
                    'Cookie': sessionCookie,
                    'User-Agent': 'Mozilla/5.0',
                    'Referer': BASE_URL + '/student/home/home.aspx'
                }
            });
        } catch (e) {
            console.warn("Logout failed:", e.message);
        }

        if (lessons.length > 0) {
            res.json(lessons);
        } else {
            res.status(404).json({ error: 'برنامه‌ای پیدا نشد' });
        }

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: 'مشکلی پیش اومد. بعداً دوباره تلاش کن.' });
    }
});

module.exports = router;
