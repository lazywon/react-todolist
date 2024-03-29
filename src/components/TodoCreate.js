import React, { useCallback, useContext, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AxiosContext from '../contexts/AxiosContext';
import TodoContext from '../contexts/TodoContext';
import todoCreateApi from '../api/todoCreateApi';

const TodoCreate = () => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const { todos, setTodos, todo_id } = useContext(TodoContext);
  const { axios } = useContext(AxiosContext);

  const onToggle = () => setOpen(!open);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: todo_id.current,
        text,
        done: false,
      };

      todoCreateApi(axios, todo);
      setTodos(todos.concat(todo));
      todo_id.current += 1;
    },
    [todos, setTodos, todo_id, axios],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); // 기본동작 하지 않도록
      onInsert(value);
      setValue('');
    },
    [value, setValue, onInsert],
  );

  return (
    <>
      {open && (
        <div id="insert_form_positioner">
          <form id="insert_form" onSubmit={onSubmit}>
            <input
              id="input_insert"
              autoFocus
              placeholder="할 일을 입력 후, Enter를 누르세요"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            {/* form 태그 내 input이 1개인 경우 엔터키를 누르면 submit 된다 */}
          </form>
        </div>
      )}
      <button
        className={open ? 'add_button_open' : 'add_button'}
        onClick={onToggle}
        open={open}
      >
        <MdAdd />
      </button>
    </>
  );
};

export default React.memo(TodoCreate);
