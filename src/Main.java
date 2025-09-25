public class Main {
    public static void main(String[] args) throws InterruptedException {
        ThreadPool pool = new ThreadPool(3, 20);


        for (int i = 1; i <= 10; i++) {
            int priority = (int)(Math.random() * 10) + 1;
            pool.submitTask(new Task("Task-" + i, priority));
        }


        long startTime = System.currentTimeMillis();
        Thread.sleep(15000); // wait for tasks to finish
        long endTime = System.currentTimeMillis();

        pool.shutdown();
        System.out.println("All tasks completed in " + (endTime - startTime) + " ms");
    }
}
