const KeyboardMap = () => {
  // Define the keyboard layout in rows
  const keyboardRows = [
    [
      { key: "q", note: "C3", isWhiteKey: true },
      { key: "w", note: "C#3", isWhiteKey: false },
      { key: "e", note: "D3", isWhiteKey: true },
      { key: "r", note: "D#3", isWhiteKey: false },
      { key: "t", note: "E3", isWhiteKey: true },
      { key: "y", note: "F3", isWhiteKey: true },
      { key: "u", note: "F#3", isWhiteKey: false },
      { key: "i", note: "G3", isWhiteKey: true },
      { key: "o", note: "G#3", isWhiteKey: false },
      { key: "p", note: "A3", isWhiteKey: true },
      { key: "@", note: "A#3", isWhiteKey: false },
      { key: "[", note: "B3", isWhiteKey: true },
    ],
    [
      { key: "a", note: "C4", isWhiteKey: true },
      { key: "s", note: "C#4", isWhiteKey: false },
      { key: "d", note: "D4", isWhiteKey: true },
      { key: "f", note: "D#4", isWhiteKey: false },
      { key: "g", note: "E4", isWhiteKey: true },
      { key: "h", note: "F4", isWhiteKey: true },
      { key: "j", note: "F#4", isWhiteKey: false },
      { key: "k", note: "G4", isWhiteKey: true },
      { key: "l", note: "G#4", isWhiteKey: false },
      { key: ";", note: "A4", isWhiteKey: true },
      { key: ":", note: "A#4", isWhiteKey: false },
      { key: "]", note: "B4", isWhiteKey: true },
    ],
    [
      { key: "z", note: "C5", isWhiteKey: true },
      { key: "x", note: "C#5", isWhiteKey: false },
      { key: "c", note: "D5", isWhiteKey: true },
      { key: "v", note: "D#5", isWhiteKey: false },
      { key: "b", note: "E5", isWhiteKey: true },
      { key: "n", note: "F5", isWhiteKey: true },
      { key: "m", note: "F#5", isWhiteKey: false },
      { key: ",", note: "G5", isWhiteKey: true },
      { key: ".", note: "G#5", isWhiteKey: false },
      { key: "/", note: "A5", isWhiteKey: true },
      { key: "\\", note: "A#5", isWhiteKey: false },
      { key: "1", note: "B5", isWhiteKey: true },
    ],
  ];

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-8'>
        <div className='flex justify-center mb-4'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center'>
              <div className='w-8 h-8 bg-white border border-gray-300 rounded mr-2'></div>
              <span>White key (natural note)</span>
            </div>
            <div className='flex items-center'>
              <div className='w-8 h-8 bg-black rounded mr-2'></div>
              <span>Black key (sharp/flat note)</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-center gap-1'>
            {row.map((item) => (
              <div
                key={item.key}
                className={`
                  w-16 h-16 flex flex-col items-center justify-center rounded-md
                  ${
                    item.isWhiteKey
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }
                  border border-gray-300 relative
                `}
              >
                <span className='text-2xl font-bold'>{item.key}</span>
                <span className='text-xs mt-1'>{item.note}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className='mt-12'>
        <h2 className='text-xl font-bold mb-4 text-center'>
          Piano Keyboard Reference
        </h2>
        <div className='flex justify-center'>
          <div className='flex'>
            {/* Simplified piano keyboard visualization */}
            {[
              "C",
              "C#",
              "D",
              "D#",
              "E",
              "F",
              "F#",
              "G",
              "G#",
              "A",
              "A#",
              "B",
            ].map((note, index) => {
              const isBlackKey = note.includes("#");
              return (
                <div
                  key={index}
                  className={`
                    ${
                      isBlackKey
                        ? "bg-black text-white w-6 h-24 -mx-3 z-10 relative"
                        : "bg-white text-black w-10 h-36 border border-gray-300"
                    }
                    flex items-end justify-center pb-2
                  `}
                >
                  {note}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardMap;
