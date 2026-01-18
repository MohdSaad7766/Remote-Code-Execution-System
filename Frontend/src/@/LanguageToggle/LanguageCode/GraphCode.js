const GraphCode = {
    Java: `import java.util.*;
  
  public class GraphExample {
      private Map<Integer, List<Integer>> adjList;
  
      public GraphExample() {
          adjList = new HashMap<>();
      }
  
      // Add an edge to the graph
      public void addEdge(int u, int v) {
          adjList.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
          adjList.computeIfAbsent(v, k -> new ArrayList<>()).add(u); // For undirected graph
      }
  
      // DFS Traversal
      public void dfs(int start) {
          Set<Integer> visited = new HashSet<>();
          dfsHelper(start, visited);
      }
  
      private void dfsHelper(int node, Set<Integer> visited) {
          visited.add(node);
          System.out.print(node + " ");
  
          for (int neighbor : adjList.getOrDefault(node, new ArrayList<>())) {
              if (!visited.contains(neighbor)) {
                  dfsHelper(neighbor, visited);
              }
          }
      }
  
      // BFS Traversal
      public void bfs(int start) {
          Set<Integer> visited = new HashSet<>();
          Queue<Integer> queue = new LinkedList<>();
          visited.add(start);
          queue.add(start);
  
          while (!queue.isEmpty()) {
              int node = queue.poll();
              System.out.print(node + " ");
  
              for (int neighbor : adjList.getOrDefault(node, new ArrayList<>())) {
                  if (!visited.contains(neighbor)) {
                      visited.add(neighbor);
                      queue.add(neighbor);
                  }
              }
          }
      }
  
      public static void main(String[] args) {
          GraphExample graph = new GraphExample();
          graph.addEdge(0, 1);
          graph.addEdge(0, 2);
          graph.addEdge(1, 3);
          graph.addEdge(2, 3);
          graph.addEdge(3, 4);
  
          System.out.print("DFS traversal: ");
          graph.dfs(0);
          System.out.println();
  
          System.out.print("BFS traversal: ");
          graph.bfs(0);
      }
  }
  `,
    JavaScript: `class Graph {
      constructor() {
          this.adjList = new Map();
      }
  
      // Add an edge to the graph
      addEdge(u, v) {
          if (!this.adjList.has(u)) this.adjList.set(u, []);
          if (!this.adjList.has(v)) this.adjList.set(v, []);
          this.adjList.get(u).push(v);
          this.adjList.get(v).push(u); // For undirected graph
      }
  
      // DFS Traversal
      dfs(start) {
          const visited = new Set();
          this.dfsHelper(start, visited);
      }
  
      dfsHelper(node, visited) {
          visited.add(node);
          console.log(node);
  
          for (const neighbor of (this.adjList.get(node) || [])) {
              if (!visited.has(neighbor)) {
                  this.dfsHelper(neighbor, visited);
              }
          }
      }
  
      // BFS Traversal
      bfs(start) {
          const visited = new Set();
          const queue = [start];
          visited.add(start);
  
          while (queue.length > 0) {
              const node = queue.shift();
              console.log(node);
  
              for (const neighbor of (this.adjList.get(node) || [])) {
                  if (!visited.has(neighbor)) {
                      visited.add(neighbor);
                      queue.push(neighbor);
                  }
              }
          }
      }
  }
  
  // Example usage
  const graph = new Graph();
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 3);
  graph.addEdge(2, 3);
  graph.addEdge(3, 4);
  
  console.log("DFS traversal:");
  graph.dfs(0);
  
  console.log("BFS traversal:");
  graph.bfs(0);
  `,
    Python: `class Graph:
      def __init__(self):
          self.adj_list = {}
  
      # Add an edge to the graph
      def add_edge(self, u, v):
          if u not in self.adj_list:
              self.adj_list[u] = []
          if v not in self.adj_list:
              self.adj_list[v] = []
          self.adj_list[u].append(v)
          self.adj_list[v].append(u)  # For undirected graph
  
      # DFS Traversal
      def dfs(self, start):
          visited = set()
          self.dfs_helper(start, visited)
  
      def dfs_helper(self, node, visited):
          visited.add(node)
          print(node, end=" ")
  
          for neighbor in self.adj_list.get(node, []):
              if neighbor not in visited:
                  self.dfs_helper(neighbor, visited)
  
      # BFS Traversal
      def bfs(self, start):
          visited = set()
          queue = [start]
          visited.add(start)
  
          while queue:
              node = queue.pop(0)
              print(node, end=" ")
  
              for neighbor in self.adj_list.get(node, []):
                  if neighbor not in visited:
                      visited.add(neighbor)
                      queue.append(neighbor)
  
  # Example usage
  graph = Graph()
  graph.add_edge(0, 1)
  graph.add_edge(0, 2)
  graph.add_edge(1, 3)
  graph.add_edge(2, 3)
  graph.add_edge(3, 4)
  
  print("DFS traversal:")
  graph.dfs(0)
  print()
  
  print("BFS traversal:")
  graph.bfs(0)
  `,
    "C++": `#include <iostream>
  #include <vector>
  #include <queue>
  #include <unordered_set>
  using namespace std;
  
  class Graph {
  public:
      unordered_map<int, vector<int>> adjList;
  
      // Add an edge to the graph
      void addEdge(int u, int v) {
          adjList[u].push_back(v);
          adjList[v].push_back(u); // For undirected graph
      }
  
      // DFS Traversal
      void dfs(int start) {
          unordered_set<int> visited;
          dfsHelper(start, visited);
      }
  
      void dfsHelper(int node, unordered_set<int>& visited) {
          visited.insert(node);
          cout << node << " ";
  
          for (int neighbor : adjList[node]) {
              if (visited.find(neighbor) == visited.end()) {
                  dfsHelper(neighbor, visited);
              }
          }
      }
  
      // BFS Traversal
      void bfs(int start) {
          unordered_set<int> visited;
          queue<int> q;
          visited.insert(start);
          q.push(start);
  
          while (!q.empty()) {
              int node = q.front();
              q.pop();
              cout << node << " ";
  
              for (int neighbor : adjList[node]) {
                  if (visited.find(neighbor) == visited.end()) {
                      visited.insert(neighbor);
                      q.push(neighbor);
                  }
              }
          }
      }
  };
  
  int main() {
      Graph graph;
      graph.addEdge(0, 1);
      graph.addEdge(0, 2);
      graph.addEdge(1, 3);
      graph.addEdge(2, 3);
      graph.addEdge(3, 4);
  
      cout << "DFS traversal: ";
      graph.dfs(0);
      cout << endl;
  
      cout << "BFS traversal: ";
      graph.bfs(0);
      cout << endl;
  
      return 0;
  }
  `,
    output: `DFS traversal:
  0 1 3 2 4
  BFS traversal:
  0 1 2 3 4`
  };
  
  export default GraphCode;
  