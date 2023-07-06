// Desc: CRUD hooks for syncing tasks with server
import { useEffect } from 'react';
import { createTaskId } from './lib';
import dotenv from 'dotenv';
dotenv.config();


console.log("Environment: ", process.env);
const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT;

console.log("Server endpoint: ", SERVER_ENDPOINT);
export function useCreateEffect(tasks) {
  useEffect(() => {
    if (tasks.length === 0) return;
    const task = tasks.shift();
    console.log("Adding new task: ", task);

    async function createTask() {
      const res = await fetch(SERVER_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(task)
      });
      if (res.status !== 200) {
        console.log("Error adding task: ", task);
        return;
      }
    }

    createTask();
  }, [ tasks ]);
}

export function useReadEffect(callback) {
  useEffect(() => {
    console.log("Reading tasks from server");
    async function readTasks() {
      const res = await fetch(SERVER_ENDPOINT);
      const data = await res.json();
      console.log(data);
      const tasks = data.Items.map(task => {
        task.id = createTaskId(task.userId, task.timeCreated);
        return task;
      });
      callback(tasks);
    }
    readTasks();
  }, []);
}

export function useUpdateEffect(tasks) {
  useEffect(() => {
    if (tasks.length === 0) return;
    const task = tasks.shift();
    console.log("Updating task: ", task);

    async function updateTask(attribute, value) {
      const res = await fetch(SERVER_ENDPOINT, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: task.userId,
          timeCreated: task.timeCreated,
          attribute,
          value
        })
      });
      if (res.status !== 200) {
        console.log("Error completing task: ", task);
        return;
      }
    }

    task.updates.forEach(update => {
      updateTask(update.attribute, update.value);
    });

  }, [ tasks ]);
}

export function useDeleteEffect(tasks) {
  useEffect(() => {
    if (tasks.length === 0) return;
    const task = tasks.shift();
    console.log("Deleting task: ", task);

    async function deleteTask() {
      const res = await fetch(SERVER_ENDPOINT, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: task.userId,
          timeCreated: task.timeCreated
        })
      });
      if (res.status !== 200) {
        console.log("Error deleting task: ", task);
        return;
      }
    }

    deleteTask();

  }, [tasks]);
}

