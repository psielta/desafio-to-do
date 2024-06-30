import { Check, Trash } from 'phosphor-react';
import styles from './Task.module.css';
import Checkbox from './Checkbox';
import { useState, useRef } from 'react';
import { Formik, Field, Form, FormikProps } from 'formik';
import { TaskDto } from './Main';
import { toast } from 'react-toastify';

interface TaskProps {
    id: number;
    text: string;
    completed: boolean;
    setTaskMain: (task: TaskDto) => void;
    deleteTaskMain: (id: number) => void;
}

export function Task({ id, text, completed, setTaskMain, deleteTaskMain }: TaskProps) {
    const notifyError = () => toast.error("Ocorreu uma falha ao salvar registro.");

    const [task, setTask] = useState<TaskDto>({ id: id, text: text, completed: completed });
    const [isChecked, setIsChecked] = useState<boolean>(completed);
    const [serverUrlTask, setServerUrlTask] = useState<string>(`${import.meta.env.VITE_API_BASE_URL}/api/Tarefa/${id}`);
    const formikRef = useRef<FormikProps<any>>(null);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    };

    function handleTrashClick() {
        fetch(serverUrlTask, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.status === 204) {
                deleteTaskMain(id);
                toast.dark("Tarefa excluída com sucesso.");
                return;
            }
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            deleteTaskMain(id);
        })
        .catch(error => {
            console.error(error);
            toast.error("Ocorreu uma falha ao excluir tarefa.");
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.task}>
                <div className={styles.item}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{
                            text: '',
                            completed: '',
                        }}
                        onSubmit={
                            async (values) => {
                                debugger;
                                await new Promise((r) => setTimeout(r, 200));
                                //alert(JSON.stringify(values, null, 2));
                                setTaskMain(
                                    {
                                        id: id,
                                        text: text,
                                        completed: isChecked
                                    }
                                );
                                try {
                                    const response = await fetch(serverUrlTask, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            id: id,
                                            text: text,
                                            completed: isChecked,
                                        }),
                                    });

                                    if (!response.ok) {
                                        throw new Error(`Erro na requisição: ${response.status}`);
                                    }

                                    const data = await response.json();

                                    let task = data as TaskDto;
                                    setTask({ id: task.id, text: task.text, completed: task.completed });
                                    setIsChecked(task.completed);
                                    setTaskMain(task);
                                } catch (error) {
                                    console.error(error);
                                    notifyError();
                                    let _isChecked = !isChecked;
                                    setIsChecked(_isChecked);
                                    setTaskMain(
                                        {
                                            id: id,
                                            text: text,
                                            completed: _isChecked
                                        }
                                    );
                                }
                            }

                        }
                    >
                        <Form className='flex'>
                            <Checkbox id={`finish_${id}`} isChecked={isChecked} setIsChecked={handleCheckboxChange} />
                            <strong className={`${isChecked ? 'line-through text-ignite_gray_300' : 'text-ignite_gray_100'}`}>{text}</strong>
                        </Form>
                    </Formik>
                </div>
                <div className='ml-9'>
                    <button>
                        <Trash onClick={handleTrashClick} size={27} />
                    </button>
                </div>
            </div>
        </div>
    );
}
