import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

const useGlobalStatistics = () => {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [stickCount, setStickCount] = useState(0);
  const [stickWins, setStickWins] = useState(0);
  const [switchCount, setSwitchCount] = useState(0);
  const [switchWins, setSwitchWins] = useState(0);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      const docRef = doc(db, "statistics", "global");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data) {
          setGamesPlayed(data.gamesPlayed);
          setStickCount(data.stickCount);
          setStickWins(data.stickWins);
          setSwitchCount(data.switchCount);
          setSwitchWins(data.switchWins);
        }
      } else {
        await setDoc(docRef, {
          gamesPlayed: 0,
          stickCount: 0,
          stickWins: 0,
          switchCount: 0,
          switchWins: 0,
        });
      }
    };

    fetchGlobalStats();
  }, []);

  const updateGlobalStatistics = async (choice: number, selectedDoor: number, winningDoor: number) => {
    const isWin = choice === winningDoor;
    const isStick = choice === selectedDoor;

    const docRef = doc(db, "statistics", "global");

    await updateDoc(docRef, {
      gamesPlayed: increment(1),
      stickCount: isStick ? increment(1) : increment(0),
      stickWins: isStick && isWin ? increment(1) : increment(0),
      switchCount: isStick ? increment(0) : increment(1),
      switchWins: !isStick && isWin ? increment(1) : increment(0),
    });

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data) {
      setGamesPlayed(data.gamesPlayed);
      setStickCount(data.stickCount);
      setStickWins(data.stickWins);
      setSwitchCount(data.switchCount);
      setSwitchWins(data.switchWins);
    }
  };

  return {
    gamesPlayed,
    stickCount,
    stickWins,
    switchCount,
    switchWins,
    updateGlobalStatistics,
  };
};

export { useGlobalStatistics }
