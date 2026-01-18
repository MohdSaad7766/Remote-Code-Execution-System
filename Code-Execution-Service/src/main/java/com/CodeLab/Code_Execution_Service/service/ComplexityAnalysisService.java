package com.CodeLab.Code_Execution_Service.service;

import com.CodeLab.Code_Execution_Service.DTO.gemini.GeminiRequestBody;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    public Map<String, String> getTimeAndSpaceComplexity(String code){
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
        headers.set("x-goog-api-key",geminiKey);

        GeminiRequestBody  requestBody = GeminiRequestBody.getGeminiRequestDTO(prompt);

        HttpEntity<GeminiRequestBody> httpEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Object> response = restTemplate.exchange(geminiUrl, HttpMethod.POST, httpEntity, Object.class);

        System.out.println(response.getBody());


        Map<String, String> complexities = new HashMap<>();

        complexities.put("TC", "O(n)");
        complexities.put("SC", "O(1)");

        return complexities;
    }
}
