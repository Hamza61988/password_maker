import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

function App() {
  const [showWarning, setShowWarning] = useState(false);
  const [letter, setCap] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [minute, setMinute] = useState(false);
  const [date, setDate] = useState(false);
  const [firstletter, changeFirst] = useState(false);
  const [password, setPassword] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reentered, setReentered] = useState("");

  const [banana, setBanana] = useState(false);
  const [no123, setNo123] = useState(false);
  const [upperVowel, setUpperVowel] = useState(false);
  const [doubleBang, setDoubleBang] = useState(false);
  const [love, setLove] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [palindrome, setPalindrome] = useState(false);
  const [notEndNumber, setNotEndNumber] = useState(false);
  const [repeatChar, setRepeatChar] = useState(false);
  const [unicorn, setUnicorn] = useState(false);

  const messageBoxStyle =
    "w-full px-4 py-3 my-2 rounded-xl shadow-md transition-all duration-300 animate-fadeIn text-sm sm:text-base break-words";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
    setIsUserTyping(true);

    setShowWarning(inputValue.length < 8);
    changeFirst(Boolean(inputValue[0] && !/^[a-zA-Z]/.test(inputValue[0])));
    setCap(inputValue[0] !== inputValue[0]?.toUpperCase());
    setHasNumber(/\d/.test(inputValue));
    setSpecial(/[!@#$%^&()]/.test(inputValue));

    const now = new Date();
    const minutes = now.getMinutes();
    const todayDate = now.getDate();

    setMinute(inputValue.includes(String(minutes)));
    setDate(inputValue.includes(String(todayDate)));

    setPassword(inputValue.toLowerCase().includes("password"));

    setBanana(inputValue.toLowerCase().includes("banana"));
    setNo123(!inputValue.includes("123"));
    setUpperVowel(/[AEIOU]/.test(inputValue));
    setDoubleBang((inputValue.match(/!/g) || []).length >= 2);
    setLove(inputValue.toLowerCase().includes("love"));
    setEmoji(/[\u{1F600}-\u{1F64F}]/u.test(inputValue));
    setPalindrome(/(\w)(\w)?\2\1/.test(inputValue));
    setNotEndNumber(!/\d$/.test(inputValue));
    setRepeatChar(/([a-z])\1/.test(inputValue));
    setUnicorn(inputValue.toLowerCase().includes("unicorn"));
  };

  const allValid =
    !showWarning &&
    !letter &&
    hasNumber &&
    special &&
    minute &&
    date &&
    !firstletter &&
    password &&
    banana &&
    no123 &&
    upperVowel &&
    doubleBang &&
    love &&
    emoji &&
    palindrome &&
    notEndNumber &&
    repeatChar &&
    unicorn;

  useEffect(() => {
    setIsUserTyping(false);
  }, []);

  const handleSubmit = () => {
    if (confirmPassword === reentered) {
      confetti({
        particleCount: 400,
        spread: 170,
        origin: { y: 0.6 },
      });
    } else {
      alert("❌ Passwords do not match!");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl text-white font-sans">
        <div className="text-center text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          🔐 Create Your Ultimate Password
        </div>

        <input
          type="text"
          className="w-full p-3 sm:p-4 text-black rounded-md mb-6 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
          placeholder="Type your password..."
          onChange={handleChange}
        />

        {/* Validation Messages */}
        <div className="flex flex-col items-center">
          {isUserTyping && showWarning && (
            <div className={`bg-yellow-200 text-yellow-900 ${messageBoxStyle}`}>⚠️ Password too short!</div>
          )}
          {isUserTyping && letter && (
            <div className={`bg-red-200 text-red-900 ${messageBoxStyle}`}>🔠 First letter should be capital.</div>
          )}
          {isUserTyping && !hasNumber && (
            <div className={`bg-red-200 text-red-900 ${messageBoxStyle}`}>🔢 Include at least one number.</div>
          )}
          {isUserTyping && !special && (
            <div className={`bg-red-200 text-red-900 ${messageBoxStyle}`}>✳️ Add a special character.</div>
          )}
          {isUserTyping && !minute && (
            <div className={`bg-red-200 text-red-900 ${messageBoxStyle}`}>⏰ Include the current minute.</div>
          )}
          {isUserTyping && !date && (
            <div className={`bg-red-200 text-red-900 ${messageBoxStyle}`}>📅 Include today's date.</div>
          )}
          {isUserTyping && firstletter && (
            <div className={`bg-red-200 text-red-900 ${messageBoxStyle}`}>🅰️ First character must be a letter.</div>
          )}
          {isUserTyping && !password && (
            <div className={`bg-red-200 text-red-900 ${messageBoxStyle}`}>🔑 Include the word "password".</div>
          )}
          {isUserTyping && !banana && (
            <div className={`bg-purple-200 text-purple-900 ${messageBoxStyle}`}>🍌 Add "banana".</div>
          )}
          {isUserTyping && !no123 && (
            <div className={`bg-pink-200 text-pink-900 ${messageBoxStyle}`}>🚫 Don't include "123".</div>
          )}
          {isUserTyping && !upperVowel && (
            <div className={`bg-indigo-200 text-indigo-900 ${messageBoxStyle}`}>🗣 Use an uppercase vowel.</div>
          )}
          {isUserTyping && !doubleBang && (
            <div className={`bg-yellow-200 text-yellow-900 ${messageBoxStyle}`}>❗ Use "!" at least twice.</div>
          )}
          {isUserTyping && !love && (
            <div className={`bg-red-100 text-red-800 ${messageBoxStyle}`}>❤️ Add some "love".</div>
          )}
          {isUserTyping && !emoji && (
            <div className={`bg-green-100 text-green-800 ${messageBoxStyle}`}>😜 Add an emoji.</div>
          )}
          {isUserTyping && !palindrome && (
            <div className={`bg-gray-200 text-gray-800 ${messageBoxStyle}`}>🪞 Add a palindrome (like "abba").</div>
          )}
          {isUserTyping && !notEndNumber && (
            <div className={`bg-blue-100 text-blue-900 ${messageBoxStyle}`}>🔚 Don't end with a number.</div>
          )}
          {isUserTyping && !repeatChar && (
            <div className={`bg-orange-200 text-orange-900 ${messageBoxStyle}`}>♻️ Use repeated lowercase letters.</div>
          )}
          {isUserTyping && !unicorn && (
            <div className={`bg-fuchsia-200 text-fuchsia-900 ${messageBoxStyle}`}>🦄 Include "unicorn".</div>
          )}
        </div>

        {/* Final Step */}
        {allValid && (
          <div className="mt-6 sm:mt-8 flex flex-col gap-4 items-center animate-fadeIn">
            <input
              type="text"
              className="w-full p-3 sm:p-4 text-black rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
              placeholder="Re-enter your password"
              value={reentered}
              onChange={(e) => setReentered(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white text-sm sm:text-lg px-6 py-3 rounded-md transition shadow-lg"
            >
              ✅ Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
