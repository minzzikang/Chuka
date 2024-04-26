import DatePicker from "react-datepicker";
import "@styles/DatePicker.css";
import { forwardRef, useState } from "react";
import * as c from "@components/calendar/Calendar.styled";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale"; //한국어 설정

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

interface CalendarProps {
  onDateChange: (date: Date) => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <c.Input
      className="custom-input"
      onClick={onClick}
      value={value}
      ref={ref}
      placeholder="축하할 날짜를 선택해주세요."
      readOnly
    />
  )
);

const index: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (date: Date | null) => {
    if (date) {
      onDateChange(date);
      setSelectedDate(date);
    }
    handleClose();
    console.log("날짜선택:", date);
  };

  return (
    <>
      {isOpen && <div className="overlay" />}
      <DatePicker
        customInput={<CustomInput onClick={handleOpen} />}
        selected={selectedDate}
        onChange={handleChange}
        onCalendarOpen={handleOpen}
        onCalendarClose={handleClose}
        minDate={new Date()}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        shouldCloseOnSelect
        showIcon
        toggleCalendarOnIconClick
        disabledKeyboardNavigation
      />
    </>
  );
};

export default index;
