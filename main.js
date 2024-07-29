// main.js

// Initialize Firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Admin functions
function showAddTeacherForm() {
  document.getElementById("admin-content").innerHTML = `
        <h2>Add Teacher</h2>
        <form id="addTeacherForm">
            <input type="text" id="teacherName" placeholder="Name" required>
            <input type="text" id="teacherDepartment" placeholder="Department" required>
            <input type="text" id="teacherSubject" placeholder="Subject" required>
            <button type="submit">Add Teacher</button>
        </form>
    `;

  document
    .getElementById("addTeacherForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = document.getElementById("teacherName").value;
      const department = document.getElementById("teacherDepartment").value;
      const subject = document.getElementById("teacherSubject").value;

      try {
        await addDoc(collection(db, "teachers"), { name, department, subject });
        alert("Teacher added successfully");
        document.getElementById("addTeacherForm").reset();
      } catch (error) {
        console.error("Error adding teacher: ", error);
      }
    });
}

async function viewAllAppointments() {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  let appointments = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    appointments += `<div>
            <p>Student: ${data.studentName}</p>
            <p>Teacher: ${data.teacherName}</p>
            <p>Time: ${data.time}</p>
        </div>`;
  });
  document.getElementById(
    "admin-content"
  ).innerHTML = `<h2>All Appointments</h2>${appointments}`;
}

function logout() {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error logging out: ", error);
    });
}

// Add more functions as per the requirements for teachers and students...
