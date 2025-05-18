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
    "w-[400px] h-[80px] flex items-center justify-center text-center px-6 py-4 rounded-xl shadow-md transition-all duration-300";

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

    const pas = "password";
    setPassword(inputValue.toLowerCase().includes(pas)); // FIXED

    // Funny validations
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
        particleCount: 550,
        spread: 5000,
        origin: { y: 0.6 },
      });
     
    } else {
      alert("❌ Passwords do not match!");
    }
  };

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
          <div className={`bg-yellow-100 border border-yellow-400 text-yellow-800 ${messageBoxStyle}`}>
            ⚠️ Password too short!
          </div>
        )}
        {isUserTyping && letter && (
          <div className={`bg-red-100 border border-red-400 text-red-700 ${messageBoxStyle}`}>
            🔠 First letter should be capital.
          </div>
        )}
        {isUserTyping && !hasNumber && (
          <div className={`bg-red-100 border border-red-400 text-red-700 ${messageBoxStyle}`}>
            🔢 Password should contain at least one number.
          </div>
        )}
        {isUserTyping && !special && (
          <div className={`bg-red-100 border border-red-400 text-red-700 ${messageBoxStyle}`}>
            ✳️ Password should contain at least one special character.
          </div>
        )}
        {isUserTyping && !minute && (
          <div className={`bg-red-100 border border-red-400 text-red-700 ${messageBoxStyle}`}>
            ⏰ Password should contain the current minute!
          </div>
        )}
        {isUserTyping && !date && (
          <div className={`bg-red-100 border border-red-400 text-red-700 ${messageBoxStyle}`}>
            📅 Password should contain today's date.
          </div>
        )}
        {isUserTyping && firstletter && (
          <div className={`bg-red-100 border border-red-400 text-red-700 ${messageBoxStyle}`}>
            🅰️ Password's first letter should not be a number or symbol.
          </div>
        )}
        {isUserTyping && !password && (
          <div className={`bg-red-100 border border-red-400 text-red-700 ${messageBoxStyle}`}>
            ❌ Password must include the word "password".
          </div>
        )}

        {/* Funny Conditions */}
        {isUserTyping && !banana && (
          <div className={`bg-purple-100 border border-purple-400 text-purple-700 ${messageBoxStyle}`}>
            🍌 Must include the word "banana".
          </div>
        )}
        {isUserTyping && !no123 && (
          <div className={`bg-pink-100 border border-pink-400 text-pink-700 ${messageBoxStyle}`}>
            🚫 Must not contain "123".
          </div>
        )}
        {isUserTyping && !upperVowel && (
          <div className={`bg-indigo-100 border border-indigo-400 text-indigo-700 ${messageBoxStyle}`}>
            🗣️ Must contain at least one uppercase vowel (A, E, I, O, U).
          </div>
        )}
        {isUserTyping && !doubleBang && (
          <div className={`bg-yellow-100 border border-yellow-400 text-yellow-700 ${messageBoxStyle}`}>
            ❗ Must include "!" at least twice.
          </div>
        )}
        {isUserTyping && !love && (
          <div className={`bg-red-100 border border-red-400 text-red-700 ${messageBoxStyle}`}>
            ❤️ Must contain the word "love".
          </div>
        )}
        {isUserTyping && !emoji && (
          <div className={`bg-green-100 border border-green-400 text-green-700 ${messageBoxStyle}`}>
            😜 Must include at least one emoji.
          </div>
        )}
        {isUserTyping && !palindrome && (
          <div className={`bg-gray-100 border border-gray-400 text-gray-700 ${messageBoxStyle}`}>
            🪞 Must have a palindrome like "madam" or "lol".
          </div>
        )}
        {isUserTyping && !notEndNumber && (
          <div className={`bg-blue-100 border border-blue-400 text-blue-700 ${messageBoxStyle}`}>
            🔚 Must not end with a number.
          </div>
        )}
        {isUserTyping && !repeatChar && (
          <div className={`bg-orange-100 border border-orange-400 text-orange-700 ${messageBoxStyle}`}>
            ♻️ Must have a repeated lowercase letter like "ss", "tt".
          </div>
        )}
        {isUserTyping && !unicorn && (
          <div className={`bg-fuchsia-100 border border-fuchsia-400 text-fuchsia-700 ${messageBoxStyle}`}>
            🦄 Must include the word "unicorn".
          </div>
        )}

        {/* Final Step */}
        {allValid && (
          <div className="flex flex-col items-center gap-4 pt-4">
            <input
              type="text"
              className="text-gray-900 p-4 rounded"
              placeholder="Type it again"
              value={reentered}
              onChange={(e) => setReentered(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded shadow transition"
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
