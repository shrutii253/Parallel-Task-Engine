public class ThreadPool {
    private Worker[] workers;
    private TaskQueue taskQueue;

    public ThreadPool(int numThreads, int queueCapacity) {
        taskQueue = new TaskQueue(queueCapacity);
        workers = new Worker[numThreads];

        for (int i = 0; i < numThreads; i++) {
            workers[i] = new Worker(taskQueue, i + 1);
            workers[i].start();
        }
    }

    // Accept Task instead of Runnable
    public void submitTask(Task task) {
        try {
            taskQueue.addTask(task);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void shutdown() {
        for (Worker worker : workers) {
            worker.stopWorker();
        }
    }
}
