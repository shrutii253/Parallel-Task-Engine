public class Task implements Runnable, Comparable<Task> {
    private String taskName;
    private int priority; // higher number = higher priority

    public Task(String taskName, int priority) {
        this.taskName = taskName;
        this.priority = priority;
    }

    @Override
    public void run() {
        long start = System.currentTimeMillis();
        System.out.println("Executing " + taskName + " with priority " + priority + " by " + Thread.currentThread().getName());
        try {
            Thread.sleep(1000); // simulate task work
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        long end = System.currentTimeMillis();
        System.out.println(taskName + " finished in " + (end - start) + " ms");
    }

    public int getPriority() {
        return priority;
    }

    public String getTaskName() {
        return taskName;
    }

    @Override
    public int compareTo(Task other) {
        return Integer.compare(other.priority, this.priority); // higher priority first
    }
}
