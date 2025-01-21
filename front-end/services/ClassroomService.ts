import { Classroom } from '@types';

const addClassroom = (classroom: Classroom) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/classroom/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(classroom),
  });
};

const ClassRoomService = {
  addClassroom,
};

export default ClassRoomService;
