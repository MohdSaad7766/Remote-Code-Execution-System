import Layout from "./Layout.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./@/components/Home/Home.jsx";
import LayoutDsa from "./LayoutOf/DSALayout/LayoutDsa.jsx";
import Stack from "./@/codelab/Stack.jsx";
import Queue from "./@/codelab/Queue/Queue.jsx";
import Array from "./@/codelab/Arrays/Array.jsx";
import Tree from "./@/codelab/Tree/Tree.jsx";
import ContactForm from "./@/components/Contact/Contact.jsx";
import CodingStatement from "./@/components/ProblemStatement/CodingStatement.jsx";
import About from "./@/components/About/About.jsx";
import ProblemList from "./@/components/ProblemList/ProblemList.jsx";
import DSALanding from "./@/codelab/DsaIntro/DsaIntro.jsx";
import ContestLandingPage from "./@/components/Contest/ContestLandingPage.jsx";
import CodingContestInstructions from "./@/components/Contest/CodingContestInstructions.jsx";
import MergeSort from "./@/codelab/Sorting/MergeSort/MergeSort.jsx";
import BubbleSort from "./@/codelab/Sorting/BubbleSort/BubbleSort.jsx";
import InsertionSort from "./@/codelab/Sorting/InsertionSort/InsertionSort.jsx";
import QuickSort from "./@/codelab/Sorting/QuickSort/QuickSort.jsx";
import SelectionSort from "./@/codelab/Sorting/SelectionSort/SelectionSort.jsx";
import LinkedList from "./@/codelab/LinkedList/LinkedListIntro.jsx";
import SinglyLinkedList from "./@/codelab/LinkedList/SinglyLinkedList.jsx";
import DoublyLinkedList from "./@/codelab/LinkedList/DoublyLinkedList.jsx";
import String from "./@/codelab/String/String.jsx";
import Graph from "./@/codelab/Graph/Graph.jsx";
import LinearSearch from "./@/codelab/Searching/LinearSearch/LinearSearch.jsx";
import BinarySearch from "./@/codelab/Searching/BinarySearch/BinarySearch.jsx";
import Recursion from "./@/codelab/Techniques/Recursion/Recursion.jsx";
import Backtracking from "./@/codelab/Techniques/Backtracking/Backtracking.jsx";
import ContestDetailPage from "./@/components/Contest/contestDetailPage.jsx";
import AdminDashboard from "./Admin-Dashboard/AdminDashboard.jsx";
import ManageUsers from "./Admin-Dashboard/ManageUsers.jsx";
import Problem from "./Admin-Dashboard/Problem.jsx";
import Admin from "./Admin-Dashboard/Admin-layout/Admin.jsx";
import Kruskal from "./@/codelab/Algorithms/KruskalAlgo/KruskalAlgorithmExplanation.jsx";
import PrimsAlgorithmExplanation from "./@/codelab/Algorithms/PrimsAlgo/PrimsAlgorithmExplanation.jsx";
import AuthComponent from "./@/components/Auth/auth.jsx";
import ContestLivePage from "./@/components/Contest/ContestLivePage.jsx";
import ProblemSolvePage from "./@/components/Contest/ProblemSolvePage.jsx"; 
import ContestInstructionsPage from "./@/components/Contest/ContestInstructionsPage";
import SolveProblemPage from "./@/components/Contest/SolveProblemPage";
import ContestLayout from "./@/components/Contest/ContestLayout";
import ContestTable from "./Admin-Dashboard/Contest/ContestTable.jsx";

// 👇 IMPORT THE NEW REGISTRATION COMPONENT
import RegistrationComponent from "./@/components/Auth/RegistrationComponent.jsx";
import LoginComponent from "./@/components/Auth/LoginComponent.jsx";
import ProfileSetupComponent from "./@/components/Auth/ProfileSetupComponent.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* NO NAVBAR LAYOUT FOR CONTESTS */}
      <Route element={<ContestLayout />}>
        <Route path="contest/:contestId" element={<ContestLivePage />} />
        <Route path="contest/:contestId/instructions" element={<ContestInstructionsPage />} />
        <Route path="contest/:contestId/problem/:contestProblemId" element={<ProblemSolvePage />} />
        <Route path="contest/:contestId/solve/:index" element={<SolveProblemPage />} />
      </Route>

      {/* NORMAL PAGES WITH NAVBAR */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="dsa" element={<LayoutDsa />}>
          <Route index element={<DSALanding />} />
          <Route path="array" element={<Array />} />
          <Route path="string" element={<String />} />
          <Route path="graph" element={<Graph />} />
          <Route path="stack" element={<Stack />} />
          <Route path="queue" element={<Queue />} />
          <Route path="linked-lists" element={<LinkedList />} />
          <Route path="linked-lists/singly-linked-list" element={<SinglyLinkedList />} />
          <Route path="linked-lists/doubly-linked-list" element={<DoublyLinkedList />} />
          <Route path="sorting/merge-sort" element={<MergeSort />} />
          <Route path="sorting/bubble-sort" element={<BubbleSort />} />
          <Route path="sorting/insertion-sort" element={<InsertionSort />} />
          <Route path="sorting/selection-sort" element={<SelectionSort />} />
          <Route path="sorting/quick-sort" element={<QuickSort />} />
          <Route path="searching/linear-search" element={<LinearSearch />} />
          <Route path="searching/binary-search" element={<BinarySearch />} />
          <Route path="recursion" element={<Recursion />} />
          <Route path="backtracking" element={<Backtracking />} />
          <Route path="tree" element={<Tree />} />
          <Route path="algorithm/prims" element={<PrimsAlgorithmExplanation />} />
          <Route path="algorithm/kruskal" element={<Kruskal />} />
        </Route>

        <Route path="contestLanding" element={<ContestLandingPage />} />
        <Route path="contest/contestInstraction" element={<CodingContestInstructions />} />
        <Route path="/contest/:contestId/view" element={<ContestDetailPage />} />
        <Route path="contact-us" element={<ContactForm />} />
        
        {/* UPDATED AUTH ROUTES */}
        <Route path="login" element={<LoginComponent />} />
        <Route path="sign-up" element={<RegistrationComponent />} />
        <Route path="setup-profile" element={<ProfileSetupComponent />} />
        
        <Route path="problemstat/:id" element={<CodingStatement />} />
        <Route path="about" element={<About />} />
        <Route path="problems" element={<ProblemList />} />
      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route index path='dashboard' element={<AdminDashboard />} />
        <Route path='users' element={<ManageUsers />} />
        <Route path="problems" element={<Problem />} />
        <Route path="contests" element={<ContestTable />} />
      </Route>
    </>
  )
);

export default router;