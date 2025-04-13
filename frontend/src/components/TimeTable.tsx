import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Download, Trash2, RefreshCw } from 'lucide-react';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
import { Class } from '../types';
// import { VAZIR_FONT } from '../../fonts/vazir-font.ts';
import { WelcomeSchedule } from './WelcomeSchedule';
import { AlertPopup } from './AlertPopup';
import { useNavigate } from 'react-router-dom';

const DAYS = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'] as const;
const DAYS_PERSIAN = {
  saturday: 'شنبه',
  sunday: 'یکشنبه',
  monday: 'دوشنبه',
  tuesday: 'سه‌شنبه',
  wednesday: 'چهارشنبه',
  thursday: 'پنج‌شنبه'
} as const;
const START_HOUR = 8;
const END_HOUR = 19;

const TimeTable: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<Class[]>([]);
  const [hasScheduleData, setHasScheduleData] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showRefreshAlert, setShowRefreshAlert] = useState<boolean>(false);

  const loadScheduleFromStorage = () => {
    const storedSchedule = localStorage.getItem('classesData');
    if (storedSchedule) {
      try {
        const parsedSchedule = JSON.parse(storedSchedule);
        setClasses(parsedSchedule);
        setHasScheduleData(true);
        setError('');
      } catch (error) {
        console.error('Error parsing stored schedule:', error);
        setHasScheduleData(false);
        setError('خطا در خواندن اطلاعات ذخیره شده');
      }
    } else {
      setHasScheduleData(false);
    }
  };

  const handleRefreshClick = () => {
    setShowRefreshAlert(true);
  };

  useEffect(() => {
    loadScheduleFromStorage();
  }, []);

  // If no schedule data is found, show the welcome component
  if (!hasScheduleData) {
    return <WelcomeSchedule />;
  }

  const handleClassClick = (cls: Class) => {
    if (!selectedClasses.find(c => c.id === cls.id)) {
      setSelectedClasses([...selectedClasses, cls]);
    }
  };

  /*
    const handleDeleteClass = (classId: string) => {
      setSelectedClasses(selectedClasses.filter(cls => cls.id !== classId));
    };
  
    const handleDownloadPDF = () => {
      const doc = new jsPDF();
  
      doc.addFileToVFS(`${VAZIR_FONT.name}.ttf`, VAZIR_FONT.normal);
      doc.addFont(`${VAZIR_FONT.name}.ttf`, VAZIR_FONT.name, 'normal');
      doc.setFont(VAZIR_FONT.name);
  
      autoTable(doc, {
        head: [['پایان کلاس', 'شروع کلاس', 'روز کلاس', 'استاد', 'نام درس', 'تعداد واحد']],
        body: selectedClasses.map(cls => [
          cls.endTime,
          cls.startTime,
          cls.day,
          cls.professorName,
          cls.className,
          cls.room,
        ]),
        styles: {
          font: 'Vazir',
          fontSize: 10,
          cellPadding: 3,
          halign: 'right'
        },
        headStyles: {
          fillColor: [66, 139, 202],
          textColor: 255,
          fontStyle: 'bold'
        },
        bodyStyles: {
          textColor: 50
        },
        theme: 'grid'
      });
  
      doc.save('جدول-انتخاب-واحد.pdf');
    };
  */

  const getTimeSlotClasses = (day: string, hour: number, minute: number) => {
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return classes.filter(cls => {
      const [startHour, startMinute] = cls.startTime.split(':').map(Number);
      const [endHour, endMinute] = cls.endTime.split(':').map(Number);
      const classStart = startHour * 60 + startMinute;
      const classEnd = endHour * 60 + endMinute;
      const slotTime = hour * 60 + minute;

      return cls.day === day &&
        slotTime >= classStart &&
        slotTime < classEnd;
    });
  };

  const isFirstSlotOfClass = (cls: Class, hour: number, minute: number): boolean => {
    const [startHour, startMinute] = cls.startTime.split(':').map(Number);
    return startHour === hour && startMinute === minute;
  };

  // const totalUnits = selectedClasses.reduce((sum, cls) => sum + (Number(cls.room) || 0), 0);

  return (
    <div className="space-y-8 container m-auto p-4">
      <div className="flex justify-between items-center pt-16 px-6">
        <h1 className="text-lg font-vazir text-foreground">برنامه هفتگی</h1>
        <button
          onClick={handleRefreshClick}
          className="flex text-sm items-center gap-2 px-4 py-2 bg-[#776BB2] text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-vazir"
        >
          <RefreshCw className="w-4 h-4" />
          بروزرسانی برنامه
        </button>
      </div>

      {error && (
        <div className="text-destructive text-center text-sm">{error}</div>
      )}

      <AlertPopup
        isOpen={showRefreshAlert}
        onClose={() => setShowRefreshAlert(false)}
        title="بروزرسانی برنامه"
        message="برای بروزرسانی برنامه هفتگی، لطفا دوباره وارد شوید"
        showLoginButton={true}
      />

      <div className="w-full overflow-x-auto pt-1 pb-5 font-vazir">
        <div className="min-w-[1300px]">
          <div className="grid grid-cols-[100px_repeat(6,1fr)] bg-background">
            {/* Header */}
            <div className="h-12 p-2"></div>
            {DAYS.map(day => (
              <div
                key={day}
                className="h-12 border-b border-border flex items-center justify-center font-semibold text-muted-foreground p-2"
              >
                {DAYS_PERSIAN[day]}
              </div>
            ))}

            {/* Time slots */}
            {Array.from({ length: (END_HOUR - START_HOUR) * 2 }, (_, i) => {
              const hour = Math.floor(i / 2) + START_HOUR;
              const minute = (i % 2) * 30;
              const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

              return (
                <React.Fragment key={timeString}>
                  <div className="h-16 border-b border-r border-border flex items-center justify-center text-sm text-muted-foreground p-2">
                    {timeString}
                  </div>
                  {DAYS.map(day => {
                    const slotClasses = getTimeSlotClasses(day, hour, minute);

                    return (
                      <div
                        key={`${day}-${timeString}`}
                        className="h-16 border-b border-r border-border relative"
                      >
                        <div className="flex gap-0 h-full">
                          {slotClasses.map((cls, index) => (
                            <div
                              key={cls.id}
                              onClick={() => handleClassClick(cls)}
                              style={{ backgroundColor: cls.color }}
                              className={clsx(
                                "flex-1 p-1 cursor-pointer",
                                "text-xs text-white hover:opacity-90 transition-opacity text-right font-vazir"
                              )}
                            >
                              {isFirstSlotOfClass(cls, hour, minute) && (
                                <>
                                  <div className='pb-[2px]'>{cls.className}</div>
                                  <div className="opacity-90 pb-[2px]">{cls.professorName}</div>
                                  <div className="opacity-80 pb-[2px]">{cls.room}, {cls.startTime} - {cls.endTime}</div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>


      {/* Selected Classes Table */}
      {/*       
      <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden font-vazir">
        <h1 className='text-right p-4'>واحد های انتخاب شده</h1>
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                درس
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                استاد
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                واحد
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {selectedClasses.map((cls) => (
              <tr key={cls.id}>
                <td className="px-6 py-4 text-sm text-card-foreground">
                  {cls.className}
                </td>
                <td className="px-6 py-4 text-sm text-card-foreground">
                  {cls.professorName}
                </td>
                <td className="px-6 py-4 text-sm text-card-foreground">
                  {cls.room}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                  <button
                    onClick={() => handleDeleteClass(cls.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                    title="Delete class"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      */}

      {/* Download Button */}
      {/*       
      {selectedClasses.length > 0 && (
        <div className="flex flex-col sm:flex-col lg:flex-row justify-between items-center gap-4">
          <button
            onClick={handleDownloadPDF}
            className="text-sm flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-vazir"
          >
            <Download className="w-4 h-4" />
            دانلود جدول انتخاب واحد
          </button>
          <span className="text-foreground text-center font-vazir_bold">
            تعداد واحد انتخاب شده: {totalUnits}
          </span>
        </div>
      )
      */}
    </div>
  );
};

export default TimeTable;