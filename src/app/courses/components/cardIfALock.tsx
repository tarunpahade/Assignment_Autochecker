import { Lock, School } from 'lucide-react';
import React from 'react';

const SemesterCard = ({ seester, onSemesterClick }:any) => {
  const isLocked = seester.locked;

  return (
    <div
      className={`relative p-5 border bg-gray-300 flex flex-col items-center justify-center w-40 ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => { if (!isLocked) onSemesterClick(seester); }}
    >
      <School className={isLocked ? `opacity-20` : ``} />
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="opacity-100" />
        </div>
      )}
      <h1 className={`text-xl ${isLocked ? 'opacity-20' : ''}`}>{seester.name}</h1>
    </div>
  );
};

export default SemesterCard;
