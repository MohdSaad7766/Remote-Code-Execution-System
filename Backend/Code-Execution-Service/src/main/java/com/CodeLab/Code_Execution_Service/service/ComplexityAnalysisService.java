package com.CodeLab.Code_Execution_Service.service;

import com.CodeLab.Code_Execution_Service.DTO.gemini.GeminiRequestBody;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@NoArgsConstructor
@Service
public class ComplexityAnalysisService {

//    private RestTemplate restTemplate;

    @Value("${gemini.api.url}")
    private String geminiUrl;

    @Value("${gemini.api.key}")
    private String geminiKey;

//    @Autowired
//    public ComplexityAnalysisService(RestTemplate restTemplate){
//        this.restTemplate = restTemplate;
//    }

    public Map<String, String> getTimeAndSpaceComplexity(String code)  {
        RestTemplate restTemplate = new RestTemplate();

        String prompt = """
                Analyze the time and space complexity of the following code.
                Consider the time complexity based on the number of operations required to complete the task,
                and the space complexity based on the extra memory required for the algorithm, excluding the input data. 
                Provide only the time complexity and space complexity in the format 'TC: O(...)' and 'SC: O(...)'. Do not include any other details or explanation. 
                Code: 
                """ + code;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", geminiKey);

        GeminiRequestBody requestBody = GeminiRequestBody.getGeminiRequestDTO(prompt);
        HttpEntity<GeminiRequestBody> httpEntity = new HttpEntity<>(requestBody, headers);

        Map<String, String> complexities = new HashMap<>();
        complexities.put("TC", "NA");
        complexities.put("SC", "NA");

        try {
            ResponseEntity<String> response = restTemplate
                    .exchange(
                            geminiUrl,
                            HttpMethod.POST,
                            httpEntity,
                            String.class
                    );

            // Parse the JSON
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());

            // Navigate to the text containing TC and SC
            String text = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asString();

            String[] lines = text.split("\n");

            for (String line : lines) {
                if (line.startsWith("TC:")) {
                    complexities.put("TC", line.substring(4).trim());
                } else if (line.startsWith("SC:")) {
                    complexities.put("SC", line.substring(4).trim());
                }
            }
            return complexities;

        } catch (Exception e) {
            e.printStackTrace();
            return complexities;
        }

    }
}
