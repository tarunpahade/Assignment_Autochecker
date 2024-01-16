import React from 'react';

// types.ts
export interface Step {
  label: string;
}

export interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}


const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full px-6 py-5">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <>
            <React.Fragment key={step.label}>
              <div className={`flex items-center ${index !== 0 ? 'flex-grow' : ''}`}>
                {index !== 0 && (
                  <div
                    className={`h-1 flex-grow ${isCompleted ? 'bg-black' : 'bg-gray-300'}`}
                  ></div>
                )}
                <div
                  className={`w-10 h-10 rounded-full flex justify-center items-center ${isActive ? 'bg-black text-white' : isCompleted ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'}`}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}

                </div>
                

              </div>
              
              {index !== steps.length - 1 && (
                <div
                  className={`h-1 flex-grow w-full  ${isActive || isCompleted ? 'bg-black' : 'bg-gray-300'}`}
                >
                </div>
              )}
              
            </React.Fragment>
          
        </>
          );
        })}
      </div>
      <div className="mt-3 flex w-full  justify-between">
        {steps.map((step, index) => (
          <div key={step.label} className={`text-sm relative bottom-[-10px]  text-center ${index === currentStep ? 'text-black' : 'text-gray-500'}`}>
          {step.label}
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default ProgressSteps;
