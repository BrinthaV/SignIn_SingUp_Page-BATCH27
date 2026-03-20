

document.addEventListener("DOMContentLoaded",()=>{
//const data =  [];    
    const API_KEY = "AIzaSyDFAtzHPvngKGPQfDLcBlUIs5v8r_KyMqA";
    const loadContent = document.getElementById("askGemini");
    loadContent.addEventListener('click',async () =>{
        
        const input = document.getElementById("userInput").value.trim();
        const resultUpdate = document.getElementById("result");
        if(!input)
        {
            resultUpdate.innerHTML = `<div class="alert alert-info text-center fw-bold"> Please Enter the topic you want tio search</div>`;
            return;
        }

        /*Pre-defined prompt for search result*/
        const prompt = `
        Provide a complrehensive explanation of "${input}
            Includes:
            - Definition
            - Explanation
            - Benefits
            - Drawback
            - Conclusion`
        
        resultUpdate.innerHTML=`
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary text-center" role="status"></div>
        </div>`;

        try
        {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY,
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents:[ 
                            {role: "user", parts: [{text: prompt}] }
                        ]
                    })
                }
            );
            console.log("response>>>"+response);
            if (response.ok) {
                const data =  await response.json();
                const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                resultUpdate.innerHTML=output || "No response received";
                 console.log("response received");
            } else {
                console.log(await response.text());
            }

            /*console.log(await response.json());
            const data =  await response.json();
            const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            resultUpdate.innerHTML=output || "No response received";*/
            
        }catch(error){
            console.error(error);
            resultUpdate.innerHTML="Error Loading Gemini API";
        }
    });
});