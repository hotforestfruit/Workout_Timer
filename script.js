let inputs = document.getElementById("inputs");
let container = document.getElementById("container");
let totalTimeDisplay = document.getElementById("totalTimer");
let currentTaskDisplay = document.getElementById("currentTask");
let currentTimeDisplay = document.getElementById("currentTimer");
let nextUpDisplay = document.getElementById("nextTaskName");
let upperBody = document.getElementById("upperBody");
let lowerBody = document.getElementById("lowerBody");
let timerDiv = document.getElementById("timer");

// //Total time of all tasks
let totalTime = 0;
let currentTime = 0;
// //Holds all tasks
let tasks = [];
let index = 0;

class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
}

class Timer {
  constructor(duration, target) {
    this.duration = duration;
    this.target = target;
    this.end = false;
    this.deltaTimer = 0;
    this.deltaTimerInterval = 1000;
    this.minutes = 0;
    this.seconds = 0;
  }
  convertTime(duration){
    this.minutes = ~~(duration / 1000 / 60);
    this.seconds = duration / 1000 - this.minutes * 60;
  }
  update(deltaTime) {
    if (this.deltaTimer > this.deltaTimerInterval) {
      this.convertTime(this.duration)
      this.duration -= 1000;
      this.deltaTimer = 0;
      if (this.seconds < 10) {
        this.target.innerHTML = `<h1>${this.minutes}:0${this.seconds}</h1>`;
      } else {
        this.target.innerHTML = `<h1>${this.minutes}:${this.seconds}</h1>`;
      }
    } else {
      this.deltaTimer += deltaTime;
    }

    if (this.duration <= 0) {
      this.target.innerHTML = "<h2>GOOD JOB!</h2>";
      this.end = true;
    }
  }
}
class TaskTimer extends Timer {
  constructor(duration, targetTime, targetName, array) {
    super(duration);
    this.targetTime = targetTime;
    this.targetName = targetName;
    this.array = array;
    this.last = false;
  }

  update(deltaTime) {
    if (this.deltaTimer > this.deltaTimerInterval) {
      this.targetName.innerHTML = `<h1>${this.array[0].name}<h1>`;
      this.convertTime(this.duration)
      this.duration -= 1000;
      this.deltaTimer = 0;
      if (this.seconds < 10) {
        this.targetTime.innerHTML = `<h1>${this.minutes}:0${this.seconds}</h1>`;
      } else {
        this.targetTime.innerHTML = `<h1>${this.minutes}:${this.seconds}</h1>`;
      }
    } else {
      this.deltaTimer += deltaTime;
    }
    if (this.duration / 1000 < 10 && this.array.length > 1) {
      nextUpDisplay.innerHTML = `<h2>Next Up: ${this.array[1].name}</h2>`;
    } else if (this.duration / 1000 < 10 && this.array.length < 1) {
      nextUpDisplay.innerHTML = `<h2>LAST ONE!</h2>`;
    } else {
      setTimeout(() => {
        nextUpDisplay.innerHTML = "";
      }, 800);
    }

    if (this.duration <= 0) {
      this.array.splice(0, 1);
      if (this.array.length > 0) {
        this.duration = this.array[0].duration * 1000;
      } else {
        this.targetName.innerHTML = "";
        this.targetTime.innerHTML = "";
      }
    }
  }
  checkLast() {
    if (this.array.length < 1) this.last = true;
  }
}

const totalTimer = new Timer(totalTime, totalTimeDisplay);
const currentTimer = new TaskTimer(
  currentTime,
  currentTimeDisplay,
  currentTaskDisplay,
  tasks
);
//Keep time consistent
let lastTime = 0;
function time(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  totalTimer.update(deltaTime);
  currentTimer.update(deltaTime);

  if (!totalTimer.end) requestAnimationFrame(time);
}
//Add custom tasks to current list
inputs.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push(new Task(taskName.value, Number(taskDuration.value)));
  totalTimer.duration += Number(taskDuration.value) * 1000;
  console.log(tasks);
  taskName.value = "";
  taskDuration.value = "";
});
//Start Timer
start.addEventListener("click", function () {
  currentTimer.duration += tasks[0].duration * 1000;

  container.style.animationName = "disapear";
  container.style.animationDuration = "1s";

  setTimeout(() => {
    container.style.display = "none";
  }, 800);
  timerDiv.style.animationName = "appear";
  timerDiv.style.animationDuration = "2s";
  timerDiv.style.top = "50%";
  timerDiv.style.fontSize = "3vw";
  timerDiv.style.paddingBottom = "5%";
  time(0);
});
//Workout Presets
const presetUpper = [
  {
    n: "Get Ready!",
    t: 10,
  },
  {
    n: "Push Ups",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Pike Push",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Snow Angels",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Plank Ups",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Push Up (Right Arm)",
    t: 30,
  },
  {
    n: "Push Up (Left Arm)",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Arm Circles",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Plank",
    t: 60,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Ankle Taps",
    t: 60,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Push Ups",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Roof Raise",
    t: 45,
  },
  {
    n: "Rest",
    t: 30,
  },
  {
    n: "Wide Push Up",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Supermans",
    t: 45,
  },
  {
    n: "Plank",
    t: 60,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Close Push Ups",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Delt Raises",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Hip Thrusts",
    t: 60,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Floor Dips",
    t: 60,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Side Plank (Right Side)",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Side Plank (Left Side)",
    t: 45,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Push Ups",
    t: 45,
  },
];
const presetLower = [
  {
    n: "Get Ready!",
    t: 10,
  },
  {
    n: "Squat & Pulse",
    t: 30,
  },
  {
    n: "Squat & Hamstring Stretch",
    t: 30,
  },
  {
    n: "Reverse Lunge & Reach",
    t: 30,
  },
  {
    n: "Split Squat Pulses (Right Leg)",
    t: 30,
  },
  {
    n: "Split Squat Pulses (Left Leg)",
    t: 30,
  },
  {
    n: "Good Morning & Squat",
    t: 30,
  },
  {
    n: "Standing Toe Taps",
    t: 30,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Sumo Squats",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Heel Up Sumo Pulses (Right)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Heel Up Sumo Pulses (Left)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Sumo Pulses",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Front Back Step Lunge (Right Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Front Back Step Lunge (Left Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Curtsy & Squat (Right Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Curtsy Pulses (Right Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Curtsy & Squat (Left Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Curtsy Pulses (Left Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Sumo Squats",
    t: 40,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Leg Raises (Right Leg)",
    t: 30,
  },
  {
    n: "Leg Raise Pulses (Right Leg)",
    t: 30,
  },
  {
    n: "Leg Raise Circles (Right Leg)",
    t: 30,
  },
  {
    n: "Donkey Pulses (Right Leg)",
    t: 30,
  },
  {
    n: "Fire Hydrant Pulses (Right Leg)",
    t: 30,
  },
  {
    n: "Leg Raises (Left Leg)",
    t: 30,
  },
  {
    n: "Leg Raise Pulses (Left Leg)",
    t: 30,
  },
  {
    n: "Leg Raise Circles (Left Leg)",
    t: 30,
  },
  {
    n: "Donkey Pulses (Left Leg)",
    t: 30,
  },
  {
    n: "Fire Hydrant Pulses (Left Leg)",
    t: 30,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Squats",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Lunge & Knee Drive (Right Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Lunge & Knee Drive (Left Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Squat Pulses",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Split Squat & Pulse (Right Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Split Squat & Pulse (Left Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge (Left Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge Pulses (Left Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge (Right Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "One Leg Glute Bridge Pulses (Right Leg)",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Glute Bridge Walks",
    t: 40,
  },
  {
    n: "Rest",
    t: 10,
  },
  {
    n: "Rest",
    t: 15,
  },
  {
    n: "Side Leg Raises (Right Leg)",
    t: 30,
  },
  {
    n: "Side Leg Raise Pulses (Right Leg)",
    t: 30,
  },
  {
    n: "Knee Tap & Kick (Right Leg)",
    t: 30,
  },
  {
    n: "Side Clamshell (Right Leg)",
    t: 30,
  },
  {
    n: "Side Plank Clamshell Pulses (Right Leg)",
    t: 30,
  },
  {
    n: "Side Leg Raises (Left Leg)",
    t: 30,
  },
  {
    n: "Side Leg Raise Pulses (Left Leg)",
    t: 30,
  },
  {
    n: "Knee Tap & Kick (Left Leg)",
    t: 30,
  },
  {
    n: "Side Clamshell (Left Leg)",
    t: 30,
  },
  {
    n: "Side Plank Clamshell Pulses (Left Leg)",
    t: 30,
  },
];
//Displays preset info when clicked
upperBody.addEventListener("click", (e) => {
  for (let task of presetUpper) {
    tasks.push(new Task(task.n, task.t));
    totalTimer.duration += task.t * 1000;
  }
  currentTaskDisplay.innerHTML = `<h1>Upper Body Preset</h1>`;
  totalTimeDisplay.innerHTML = `<h1>Total Time: 21:10</h1>`;
});
lowerBody.addEventListener("click", (e) => {
  for (let task of presetLower) {
    tasks.push(new Task(task.n, task.t));
    totalTimer.duration += task.t * 1000;
  }
  currentTaskDisplay.innerHTML = `<h1>Lower Body Preset</h1>`;
  totalTimeDisplay.innerHTML = `<h1>Total Time: 32:45</h1>`;
});
