import LearningPath from '@components/learning-path';
import { Teacher, User } from '@types';
import { useEffect, useState } from 'react';

type Props = {
  teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({ teachers }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    setUserRole(user.role);
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
              {/* Render a row for each teacher containing name and learning path */}
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td>
                    {teacher.user.firstName} {teacher.user.lastName}
                  </td>
                  <td>
                    {/* For question 1.c, you can use the LearningPath component. */}
                    {userRole === 'admin' ? (
                      <LearningPath
                        teacherId={teacher.id}
                        learningPath={teacher.learningPath}
                      ></LearningPath>
                    ) : (
                      teacher.learningPath
                    )}{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default TeacherOverview;
