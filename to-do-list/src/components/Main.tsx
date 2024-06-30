import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import styles from './Main.module.css';
import { PlusCircle } from 'phosphor-react';
import { Task } from './Task';
import { toast } from 'react-toastify';
import { Formik, Field, Form, FormikProps } from 'formik';
import $ from 'jquery';

export interface TaskDto {
    id: number;
    text: string;
    completed: boolean;
}

export function Main() {
    const notifyError = () => toast.error("Ocorreu uma falha ao obter tarefas do servidor.");
    const [TaskDtos, setTaskDtos] = useState<TaskDto[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [serverUrl, setServerUrl] = useState<string>(`${import.meta.env.VITE_API_BASE_URL}/api/Tarefa`);

    const setTask = (task: TaskDto) => {
        let taskIndex = TaskDtos.findIndex(t => t.id === task.id);
        TaskDtos[taskIndex] = task;
        setTaskDtos([...TaskDtos]);
    }
    const deleteTask = (id: number) => {
        setTaskDtos((prev) => prev.filter((task) => task.id !== id));
    }

    function clearInput() {
        setInputValue("");
        $("#textTask").val("");
        $("#textTask").focus();
    }

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("")
        setInputValue(event.currentTarget.value);
    }

    function getFishedTaskDtos() {
        return TaskDtos.filter(TaskDto => TaskDto.completed);
    }

    useEffect(() => {
        fetch(serverUrl)
            .then(response => response.json())
            .then(data => setTaskDtos(data))
            .catch(error => {
                console.error('Error:', error);
                notifyError();
            }
            );
    }, []);

    return (
        <main>
            <Formik
                initialValues={{
                    text: '',
                    completed: '',
                }}
                onSubmit={
                    async (values) => {
                        debugger;
                        await new Promise((r) => setTimeout(r, 200));

                        try {
                            if (inputValue === "") {
                                throw new Error("O campo de texto não pode ser vazio");
                            }
                            const response = await fetch(serverUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    text: inputValue,
                                    completed: false,
                                }),
                            });

                            if (!response.ok) {
                                throw new Error(`Erro na requisição: ${response.status}`);
                            }

                            const data = await response.json();

                            let task = data as TaskDto;
                            setTaskDtos([...TaskDtos, {
                                id: task.id,
                                text: task.text,
                                completed: task.completed
                            }]);
                            clearInput();
                            toast.success('Tarefa criada com sucesso!');
                        } catch (error: any) {
                            console.error(error);
                            if (error.message === "O campo de texto não pode ser vazio") {
                                toast.warning(error.message);
                            } else {
                                toast.error('Ocorreu uma falha ao criar tarefa.');
                            }
                        }
                    }

                }
            >
                <Form className={styles.frmToDo}>
                    <input id="textTask" onChange={handleInputOnChange} type="text" />
                    <button type='submit'>
                        Criar
                        <PlusCircle size={24} />
                    </button>
                </Form>
            </Formik>
            <div className={styles.container}>
                <div className={styles.contentHeader}>
                    <div className={styles.created}>
                        <strong>Tarefas criadas{" "}
                            <div className={styles.circle}>
                                <span>{TaskDtos.length}</span>
                            </div>
                        </strong>
                    </div>
                    <div className={styles.completed}>
                        <strong>
                            Concluidas{" "}
                            <div className={styles.circle}>
                                <span>{getFishedTaskDtos().length}</span>
                                {" "}de <span>{TaskDtos.length}</span>
                            </div>
                        </strong>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                {TaskDtos.map(task => (
                    <Task id={task.id} text={task.text} completed={task.completed}
                        key={task.id} setTaskMain={setTask} deleteTaskMain={deleteTask}
                    />
                ))}
            </div>
        </main>
    );
}