import { Classroom } from '@types';

const addClassroom = (classroom: Classroom) => {
  const userInfo = sessionStorage.getItem('loggedInUser');
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

const getClassroomByName = (name: string) => {
  const userInfo = sessionStorage.getItem('loggedInUser');
  const token = JSON.parse(userInfo).token;

  return fetch(process.env.NEXT_PUBLIC_API_URL + `/classroom/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const ClassRoomService = {
  addClassroom,
  getClassroomByName,
};

export default ClassRoomService;
