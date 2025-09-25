import java.util.concurrent.BlockingQueue;
import java.util.concurrent.PriorityBlockingQueue;

public class TaskQueue {
    private BlockingQueue<Task> queue;

    public TaskQueue(int capacity) {
        queue = new PriorityBlockingQueue<>(capacity);
    }

    public void addTask(Task task) throws InterruptedException {
        queue.put(task); // blocks if queue is full
    }

    public Task getTask() throws InterruptedException {
        return queue.take(); // blocks if queue is empty
    }
}
