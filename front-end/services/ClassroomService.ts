import { Classroom } from '@types';

const addClassroom = (classroom: Classroom) => {
  const userInfo = sessionStorage.getItem('loggedInUser');
  if (!userInfo) {
    throw new Error(
      'Unauthorized: You must be logged in to access this resource.'
    );
  }
  const token = JSON.parse(userInfo).token;

  return fetch(process.env.NEXT_PUBLIC_API_URL + '/classroom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classroom),
  });
};

const ClassRoomService = {
  addClassroom,
};

export default ClassRoomService;
