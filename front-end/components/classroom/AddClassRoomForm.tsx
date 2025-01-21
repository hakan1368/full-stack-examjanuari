import ClassroomService from '@services/ClassroomService';
import { StatusMessage } from '@types';
import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddClassRoomForm: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const classroom = { name };
    const response = await ClassroomService.addClassroom(classroom);
    if (response.status === 200) {
      setStatusMessages([
        { message: `Added classroom with name ${name}`, type: 'success' },
      ]);
    }
  };

  return (
    <div className="max-w-sm m-auto">
      <div>
        <h3 className="px-0">{'Add Classroom'}</h3>
        {statusMessages && (
          <div className="row">
            <ul className="list-none mb-3 mx-auto ">
              {statusMessages.map(({ message, type }, index) => (
                <li
                  key={index}
                  className={classNames({
                    ' text-red-800': type === 'error',
                    'text-green-800': type === 'success',
                  })}
                >
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="nameInput"
              className="block mb-2 text-sm font-medium"
            >
              {' '}
              {'Name'}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              type="text"
              id="nameInput"
              onChange={(event) => setName(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
              value={name}
            />
          </div>
          <div className="row">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              {'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClassRoomForm;
