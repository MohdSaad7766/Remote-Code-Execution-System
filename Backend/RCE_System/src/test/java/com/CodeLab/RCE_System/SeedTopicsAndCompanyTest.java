package com.CodeLab.RCE_System;

import com.CodeLab.RCE_System.entity.Company;
import com.CodeLab.RCE_System.entity.Topic;
import com.CodeLab.RCE_System.repository.CompanyRepository;
import com.CodeLab.RCE_System.repository.TopicRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

//@SpringBootTest
//@Transactional
public class SeedTopicsAndCompanyTest {
    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private CompanyRepository companyRepository;

    /* ==========================
       LEETCODE TOPICS
       ========================== */
//    @Test
    void seedLeetCodeTopics() {

        List<String> topics = List.of(
                // Data Structures
                "Array", "String", "Hash Table", "Linked List", "Stack", "Queue",
                "Heap (Priority Queue)", "Tree", "Binary Tree", "Binary Search Tree",
                "Trie", "Graph", "Matrix", "Union Find", "Design", "Ordered Set",
                "Monotonic Stack", "Monotonic Queue", "Doubly-Linked List",
                "Binary Indexed Tree", "Segment Tree",

                // Algorithms
                "Two Pointers", "Sliding Window", "Binary Search", "Sorting",
                "Greedy", "Recursion", "Backtracking", "Divide and Conquer",
                "Dynamic Programming", "Bit Manipulation", "Math", "Geometry",
                "Simulation", "Prefix Sum", "Counting", "Bucket Sort", "Radix Sort",
                "Quickselect", "Topological Sort", "Shortest Path",
                "Minimum Spanning Tree", "Eulerian Path",
                "Strongly Connected Components",

                // Graph Algorithms
                "Breadth-First Search", "Depth-First Search",
                "Dijkstra", "Bellman-Ford", "Floyd-Warshall",

                // Advanced / Patterns
                "Concurrency", "Multithreading", "Interactive", "Iterator",
                "Data Stream", "Memoization", "Game Theory", "Randomized",
                "Reservoir Sampling", "Line Sweep", "Rolling Hash",
                "Meet in the Middle", "Bitmask", "State Compression",
                "String Matching", "KMP", "Z Algorithm", "Manacher’s Algorithm"
        );

        for (String name : topics) {
            if (topicRepository.existsByTopicName(name)) continue;

            Topic topic = new Topic();
            topic.setTopicName(name);
            topicRepository.save(topic);
        }
    }

    /* ==========================
       LEETCODE COMPANIES
       ========================== */
//    @Test
    void seedLeetCodeCompanies() {

        List<String> companies = List.of(
                // Big Tech
                "Google", "Amazon", "Microsoft", "Apple", "Meta",

                // Product Companies
                "Netflix", "Uber", "Airbnb", "Adobe", "Salesforce",
                "Twitter", "LinkedIn", "Snapchat", "Spotify",

                // Finance / Trading
                "Goldman Sachs", "JP Morgan", "Morgan Stanley",
                "Bloomberg", "PayPal", "Stripe", "Visa", "Mastercard",

                // Unicorns / Startups
                "Atlassian", "Intuit", "Flipkart", "Swiggy", "Zomato",
                "Ola", "Paytm", "Razorpay", "PhonePe", "CRED",

                // Others
                "Oracle", "IBM", "Cisco", "VMware", "SAP",
                "Accenture", "Deloitte", "Infosys", "TCS", "Wipro"
        );

        for (String name : companies) {
            if (companyRepository.existsByCompanyName(name)) continue;

            Company company = new Company();
            company.setCompanyName(name);
            companyRepository.save(company);
        }
    }
}
