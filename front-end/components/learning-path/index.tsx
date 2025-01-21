import TeacherService from '@services/TeacherService';
import { useState } from 'react';

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const [selectedLearningPath, setSelectedLearningPath] =
    useState<string>(learningPath);
  const handleLearningPathChange = async (event: {
    target: { value: string };
  }) => {
    const newLearningPath = event.target.value;
    setSelectedLearningPath(newLearningPath);
    /* Use TeacherService to update the learning path for the teacher */
    try {
      await TeacherService.updateLearningPath(teacherId, newLearningPath);
    } catch (error) {
      throw new Error('Error updating the learning path.');
    }
  };

  return (
    <div className="ml-6">
      <select
        id="learningPath"
        className="ml-2 p-1"
        value={selectedLearningPath}
        onChange={handleLearningPathChange}
      >
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;
