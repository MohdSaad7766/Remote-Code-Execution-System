import React from 'react';
import ProblemExample from '../ProblemStatement/ProblemExample';

export default function ProblemExamplesSection() {
  return (
    <div className="relative w-full text-white">
      <ProblemExample srno="1" input="nums = [2,7,11,15], target = 9" output="[0,1]" explanation="Because nums[0] + nums[1] == 9, we return [0, 1]" />
      <ProblemExample srno="2" input="nums = [3,2,4], target = 6" output="[1,2]" explanation="Because nums[1] + nums[2] == 6, we return [1, 2]" />
    </div>
  );
}
