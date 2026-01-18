const KruskalCode = {
  Java: `import java.util.*;

class Edge implements Comparable<Edge> {
    int src, dest, weight;
    public Edge(int src, int dest, int weight) {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
    }
    public int compareTo(Edge compareEdge) {
        return this.weight - compareEdge.weight;
    }
}

class Subset {
    int parent, rank;
}

public class KruskalAlgorithm {
    int V, E;
    Edge[] edges;

    public KruskalAlgorithm(int v, int e) {
        V = v;
        E = e;
        edges = new Edge[E];
    }

    int find(Subset[] subsets, int i) {
        if (subsets[i].parent != i)
            subsets[i].parent = find(subsets, subsets[i].parent);
        return subsets[i].parent;
    }

    void union(Subset[] subsets, int x, int y) {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);

        if (subsets[xroot].rank < subsets[yroot].rank)
            subsets[xroot].parent = yroot;
        else if (subsets[xroot].rank > subsets[yroot].rank)
            subsets[yroot].parent = xroot;
        else {
            subsets[yroot].parent = xroot;
            subsets[xroot].rank++;
        }
    }

    void kruskalMST() {
        Edge[] result = new Edge[V - 1];
        int e = 0, i = 0;

        Arrays.sort(edges);

        Subset[] subsets = new Subset[V];
        for (int v = 0; v < V; ++v) {
            subsets[v] = new Subset();
            subsets[v].parent = v;
            subsets[v].rank = 0;
        }

        while (e < V - 1 && i < E) {
            Edge nextEdge = edges[i++];
            int x = find(subsets, nextEdge.src);
            int y = find(subsets, nextEdge.dest);

            if (x != y) {
                result[e++] = nextEdge;
                union(subsets, x, y);
            }
        }

        System.out.println("Edge \tWeight");
        for (i = 0; i < e; ++i)
            System.out.println(result[i].src + " - " + result[i].dest + "\t" + result[i].weight);
    }

    public static void main(String[] args) {
        int V = 4, E = 5;
        KruskalAlgorithm graph = new KruskalAlgorithm(V, E);

        graph.edges[0] = new Edge(0, 1, 10);
        graph.edges[1] = new Edge(0, 2, 6);
        graph.edges[2] = new Edge(0, 3, 5);
        graph.edges[3] = new Edge(1, 3, 15);
        graph.edges[4] = new Edge(2, 3, 4);

        graph.kruskalMST();
    }
}
`,

  JavaScript: `class Edge {
    constructor(src, dest, weight) {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
    }
}

class DisjointSet {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
    }

    find(u) {
        if (this.parent[u] !== u)
            this.parent[u] = this.find(this.parent[u]);
        return this.parent[u];
    }

    union(u, v) {
        let uRoot = this.find(u);
        let vRoot = this.find(v);

        if (uRoot === vRoot) return;

        if (this.rank[uRoot] < this.rank[vRoot]) {
            this.parent[uRoot] = vRoot;
        } else if (this.rank[uRoot] > this.rank[vRoot]) {
            this.parent[vRoot] = uRoot;
        } else {
            this.parent[vRoot] = uRoot;
            this.rank[uRoot]++;
        }
    }
}

function kruskalMST(V, edges) {
    edges.sort((a, b) => a.weight - b.weight);
    const ds = new DisjointSet(V);
    const result = [];

    for (let edge of edges) {
        if (ds.find(edge.src) !== ds.find(edge.dest)) {
            result.push(edge);
            ds.union(edge.src, edge.dest);
        }
    }

    console.log("Edge \tWeight");
    for (let e of result) {
        console.log(\`\${e.src} - \${e.dest}\t\${e.weight}\`);
    }
}

// Example usage
const edges = [
    new Edge(0, 1, 10),
    new Edge(0, 2, 6),
    new Edge(0, 3, 5),
    new Edge(1, 3, 15),
    new Edge(2, 3, 4)
];
kruskalMST(4, edges);
`,

  Python: `class Edge:
    def __init__(self, src, dest, weight):
        self.src = src
        self.dest = dest
        self.weight = weight

class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, u):
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])
        return self.parent[u]

    def union(self, u, v):
        u_root = self.find(u)
        v_root = self.find(v)
        if u_root == v_root:
            return
        if self.rank[u_root] < self.rank[v_root]:
            self.parent[u_root] = v_root
        elif self.rank[u_root] > self.rank[v_root]:
            self.parent[v_root] = u_root
        else:
            self.parent[v_root] = u_root
            self.rank[u_root] += 1

def kruskal_mst(V, edges):
    edges.sort(key=lambda e: e.weight)
    ds = DisjointSet(V)
    result = []

    for edge in edges:
        if ds.find(edge.src) != ds.find(edge.dest):
            result.append(edge)
            ds.union(edge.src, edge.dest)

    print("Edge \tWeight")
    for edge in result:
        print(f"{edge.src} - {edge.dest}\t{edge.weight}")

# Example usage
edges = [
    Edge(0, 1, 10),
    Edge(0, 2, 6),
    Edge(0, 3, 5),
    Edge(1, 3, 15),
    Edge(2, 3, 4)
]
kruskal_mst(4, edges)
`,

  "C++": `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int src, dest, weight;
};

struct DisjointSet {
    vector<int> parent, rank;

    DisjointSet(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; ++i)
            parent[i] = i;
    }

    int find(int u) {
        if (parent[u] != u)
            parent[u] = find(parent[u]);
        return parent[u];
    }

    void unionSets(int u, int v) {
        int uRoot = find(u);
        int vRoot = find(v);
        if (uRoot == vRoot) return;
        if (rank[uRoot] < rank[vRoot])
            parent[uRoot] = vRoot;
        else if (rank[uRoot] > rank[vRoot])
            parent[vRoot] = uRoot;
        else {
            parent[vRoot] = uRoot;
            rank[uRoot]++;
        }
    }
};

bool compare(Edge a, Edge b) {
    return a.weight < b.weight;
}

void kruskalMST(vector<Edge>& edges, int V) {
    sort(edges.begin(), edges.end(), compare);
    DisjointSet ds(V);
    vector<Edge> result;

    for (auto& edge : edges) {
        if (ds.find(edge.src) != ds.find(edge.dest)) {
            result.push_back(edge);
            ds.unionSets(edge.src, edge.dest);
        }
    }

    cout << "Edge \tWeight\\n";
    for (auto& e : result)
        cout << e.src << " - " << e.dest << "\t" << e.weight << "\\n";
}

int main() {
    vector<Edge> edges = {
        {0, 1, 10},
        {0, 2, 6},
        {0, 3, 5},
        {1, 3, 15},
        {2, 3, 4}
    };
    kruskalMST(edges, 4);
    return 0;
}
`,

  output: `Edge   Weight
2 - 3    4
0 - 3    5
0 - 1    10`
};

export default KruskalCode;
