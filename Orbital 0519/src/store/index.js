import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase/index.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

export default createStore({
  state: {
    user: null,
    isManager: true,
    displayName: "",
    licencePlate: null,
    capacity: null,
    insuranceAmount: null,
    insuranceRenewalDate: null,
    nextInsuranceRenewalDate: null,
    lastPaidRoadTaxDate: null,
    roadTaxAmount: null,
    roadTaxDueDate: null,
    lastSentForServicing: null,
    nextServicingDate: null
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = null;
    },

    SET_USER_INFO(state, doc) {
      state.isManager = doc.data().Manager;
      state.displayName = doc.data().displayName;
    },

    SET_VEHICLE_INFO(state, doc) {
      state.licencePlate = doc.data().licencePlate;
      state.capacity = doc.data().capacity;
      state.insuranceAmount = doc.data().insuranceAmount;
      state.insuranceRenewalDate = doc.data().insuranceRenewalDate;
      state.nextInsuranceRenewalDate = doc.data().nextInsuranceRenewalDate;
      state.lastPaidRoadTaxDate = doc.data().lastPaidRoadTaxDate;
      state.roadTaxAmount = doc.data().roadTaxAmount;
      state.roadTaxDueDate = doc.data().roadTaxDueDate;
      state.lastSentForServicing = doc.data().lastSentForServicing;
      state.nextServicingDate = doc.data().nextServicingDate;
    }
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("Wrong Account details");
            break;
          case "auth/wrong-password":
            alert("Wrong Account details");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async register({ commit }, details) {
      const { email, password } = details;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");

      router.push("/login");
    },
    //"CE0sMj9GYLbTpZfXj7SZbJjUoJX2"
    async fetchUser({ commit }) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      commit("SET_USER_INFO", docSnap);
    },
    //"LugADQOIuUI9h3rsWMwL"
  }
});
