import React, { useState, useEffect } from "react";

function App() {
  const [showWarning, setShowWarning] = useState(false);
  const [letter, setCap] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [minute, setMinute] = useState(false);
  const [date, setDate] = useState(false);
  const [firstletter, changeFirst] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false); // State to track user typing
  const[password , setPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setIsUserTyping(true); // Set typing to true once the user types

    // Check for password length
    setShowWarning(inputValue.length < 8);

    // Check if the first character is not a number or symbol
    if (inputValue[0] && !/^[a-zA-Z]/.test(inputValue[0])) {
      changeFirst(true); // If the first character is not a letter, set to true
    } else {
      changeFirst(false); // If it's a letter, set to false
    }

    // Check if the first character is capitalized
    setCap(inputValue[0] !== inputValue[0]?.toUpperCase());

    // Check if the input contains at least one number
    setHasNumber(/\d/.test(inputValue));

    // Check if the input contains a special character
    setSpecial(/[!@#$%^&()]/.test(inputValue));

    // Get current time and check if input contains current minute
    const now = new Date();
    const minutes = now.getMinutes();
    const todayDate = now.getDate(); // Current date (day of the month)

    setMinute(inputValue.includes(String(minutes))); // Check if current minute is in password
    setDate(inputValue.includes(String(todayDate))); // Check if current date is in password

    const pas = "password";
    setPassword(!inputValue.toLowerCase().includes(pas));

  }

  // useEffect hook to clear all validation messages when the page first loads
  useEffect(() => {
    setIsUserTyping(false); // Reset typing state when the component is mounted
  }, []);


   


  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex-col gap-5 text-2xl flex justify-center text-center items-center pt-10">
        <h4 className="text-white">Create a Password</h4>
        <input
          type="text"
          className="text-gray-900 p-6 rounded"
          placeholder="Type your password"
          onChange={handleChange}
        />

{isUserTyping && showWarning && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-xl shadow-md transition-all duration-300">
    ⚠️ Password too short!
  </div>
)}

{isUserTyping && letter && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md transition-all duration-300">
    🔠 First letter should be capital.
  </div>
)}

{isUserTyping && !hasNumber && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md transition-all duration-300">
    🔢 Password should contain at least one number.
  </div>
)}

{isUserTyping && !special && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md transition-all duration-300">
    ✳️ Password should contain at least one special character.
  </div>
)}

{isUserTyping && !minute && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md transition-all duration-300">
    ⏰ Password should contain the current minute!
  </div>
)}

{isUserTyping && !date && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md transition-all duration-300">
    📅 Password should contain today's date.
  </div>
)}

{isUserTyping && firstletter && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md transition-all duration-300">
    🅰️ Password's first letter should not be a number or symbol.
  </div>
)}

{isUserTyping && password && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md transition-all duration-300">
   There is no Password without "Password"
  </div>
)}

      </div>
    </div>
  );
}

export default App;
