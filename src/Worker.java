public class Worker extends Thread {
    private TaskQueue taskQueue;
    private boolean running = true;

    public Worker(TaskQueue taskQueue, int id) {
        super("Worker-" + id);
        this.taskQueue = taskQueue;
    }

    @Override
    public void run() {
        while (running) {
            try {
                Task task = taskQueue.getTask();
                long start = System.currentTimeMillis();
                task.run();
                long end = System.currentTimeMillis();
                System.out.println(task.getTaskName() + " executed in " + (end - start) + " ms");
            } catch (InterruptedException e) {
                System.out.println(getName() + " interrupted.");
            }
        }
    }

    public void stopWorker() {
        running = false;
        this.interrupt();
    }
}
