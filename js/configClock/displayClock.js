class DisplayClock extends displayAll {
    constructor() {
        super(); // Kế thừa các phương thức từ DisplayAll
        this.clock = document.getElementsByClassName("clock")[0]; // Khung của clock
        this.elementTime = document.getElementsByClassName("element-time"); // Các phần tử thời gian
        this.timeName = document.querySelectorAll(".clock .viewTime .time-remain > p"); // Tên thời gian
        this.colonElements = document.querySelectorAll(".clock .viewTime .hai-cham > p"); // Dấu hai chấm ":"
    }

    // Hiển thị khung clock
    async displayContainClock() {
        await this.delay(500);
        this.clock.style.width = "50%";
        this.clock.style.transition = "1s";

        await this.delay(300);
        this.clock.style.height = "220px";
    }

    // Hiển thị các phần tử thời gian
    displayElementTime() {
        this.display(800, 100, 1, this.elementTime, "top", 0, "px");
    }

    // Hiển thị tên các phần tử thời gian
    displayTimeName() {
        this.display(1000, 200, 1, this.timeName, "top", -30, "%");
    }

    // Hiển thị dấu hai chấm ":"
    displayColonElements() {
        this.display(1000, 200, 1, this.colonElements, "top", 0, "%");
    }

    // Hàm delay tiện ích
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Khởi chạy toàn bộ
    async start() {
        await this.displayContainClock();
        this.displayElementTime();
        this.displayTimeName();
        this.displayColonElements();
    }
}

// Khởi tạo và khởi chạy đồng hồ
const displayClock = new DisplayClock();
displayClock.start();
