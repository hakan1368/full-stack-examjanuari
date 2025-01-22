import ClassroomService from '@services/ClassroomService';
import { StatusMessage } from '@types';
import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddClassRoomForm: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [nameError, setNameError] = useState(null);

  const clearErrors = () => {
    setNameError(null);
    setStatusMessages([]);
  };

  const validate = async (): Promise<boolean> => {
    let res = true;

    if (!name && name.trim() === '') {
      setNameError(t('login.validate.name'));
      res = false;
    } else {
      const existingClassRoom = await ClassroomService.getClassroomByName(name);
      if (existingClassRoom) {
        setStatusMessages([
          {
            message: t('classroom.exists'),
            type: 'error',
          },
        ]);
        res = false;
      }
    }

    return res;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      return;
    }
    const classroom = { name };
    const response = await ClassroomService.addClassroom(classroom);
    if (response.status === 200) {
      setStatusMessages([
        { message: `${t('classroom.success')} ${name}`, type: 'success' },
      ]);
    }
  };

  return (
    <div className="max-w-sm m-auto">
      <div>
        <h3 className="px-0"> {t('header.nav.classrooms')}</h3>
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
              {t('classroom.name')}
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
            {nameError && <div className="text-red-800 ">{nameError}</div>}
          </div>
          <div className="row">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              {t('classroom.add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClassRoomForm;
