import LearningPath from '@components/learning-path';
import { Teacher, User } from '@types';
import { useEffect, useState } from 'react';

type Props = {
  teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({ teachers }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
  }, []);

  return (
    <>
      <section className="mt-5">
        {teachers && (
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Learning path</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td>
                    {teacher.user.firstName} {teacher.user.lastName}
                  </td>
                  <td>{teacher.learningPath}</td>
                </tr>
              ))}
              {/* For question 1.c, you can use the LearningPath component. */}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default TeacherOverview;
