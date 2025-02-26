// Add these arrays at the top of the file
const styles = [
    "casual snapshot", "candid photography", "lifestyle photography", "natural photography",
    "spontaneous capture", "everyday moment", "authentic style", "mobile photography",
    "instagram style", "social media aesthetic", "slice of life", "documentary style",
    "unposed", "natural moment", "real life capture", "photorealistic", "cinematic",
    "editorial", "portrait", "fashion", "sports", "documentary", "glamour",
    "high-end fashion", "commercial", "street photography", "fine art", "moody",
    "dramatic", "minimalist", "vintage", "black and white",
    // ... add more styles ...
];

const lightingOptions = [
    "natural light", "ambient lighting", "available light", "window light",
    "daylight", "indoor lighting", "outdoor lighting", "soft natural light",
    "morning light", "afternoon sun", "evening light", "room lighting",
    "studio lighting", "natural sunlight", "dramatic lighting", "rim lighting",
    "golden hour", "backlit", "split lighting", "butterfly lighting", "rembrandt lighting",
    "broad lighting", "short lighting", "loop lighting", "paramount lighting",
    // ... add more lighting options ...
];

const poses = [
    "standing naturally", "sitting casually", "walking", "leaning against wall",
    "candid moment", "side profile", "looking away", "reading book",
    "laughing", "thoughtful expression", "working at desk", "drinking coffee",
    "browsing phone", "window shopping", "crossing street", "waiting for train",
    "enjoying meal", "writing", "listening to music", "stretching",
    // Add more general poses...
];

const clothing = [
    "casual wear", "business attire", "smart casual", "streetwear",
    "traditional japanese clothing", "summer dress", "winter coat", "formal suit",
    "minimalist outfit", "vintage fashion", "denim jacket", "sweater and jeans",
    "button-up shirt", "casual blazer", "sundress", "leather jacket",
    "cardigan", "turtleneck", "polo shirt", "flowing dress",
    // Add more clothing options...
];

const backgrounds = [
    "coffee shop", "city park", "busy street", "modern office",
    "cozy home interior", "restaurant", "library", "beach",
    "japanese garden", "subway station", "bookstore", "local market",
    "shopping mall", "residential area", "train station", "university campus",
    "art gallery", "quiet neighborhood", "riverside", "rooftop cafe",
    // Add more backgrounds...
];

const qualityEnhancers = [
    "authentic", "natural", "unedited", "spontaneous",
    "genuine moment", "real life", "true to life", "unstaged",
    "casual quality", "natural colors", "realistic", "lifelike",
    "candid feel", "everyday aesthetic", "natural detail", "authentic atmosphere",
    "organic feel", "natural expression", "real moment", "unfiltered",
    "8k uhd", "high detail", "sharp focus", "professional", "masterpiece",
    "perfect composition", "award winning", "magazine quality", "ultra realistic",
    "studio quality", "high resolution", "detailed texture", "professional lighting",
    // ... add more enhancers ...
];

// Additional details for the subject
const details = [
    "soft thick curves",
    "full voluptuous figure",
    "healthy glowing skin",
    "strong yet feminine",
    "natural beauty",
    "generously curved form",
    "visible muscle definition",
    "tall impressive stature",
    "substantial athletic build",
    "smooth firm skin",
    "powerful feminine presence",
    "graceful strength",
    "commanding presence",
    "harmonious muscular curves",
    "statuesque physique",
    "toned arms",
    "strong shoulders",
    "athletic thickness"
];

// Camera and technical details
const technical = [
    "shot on iPhone 15 Pro",
    "natural perspective",
    "candid snapshot style",
    "authentic lighting"
];

// Add these new functions
function showCustomInput(selectElement) {
    const customInput = document.getElementById('custom' + selectElement.id.charAt(0).toUpperCase() + selectElement.id.slice(1));
    customInput.style.display = selectElement.value === 'custom' ? 'block' : 'none';
}

function getRandomItems(array, count = 1) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function generateRandomPrompt() {
    const excludeOther = option => option.value !== 'other';
    
    // Filter out "Other..." options when selecting random values
    const styleOptions = Array.from(document.getElementById('style').options).filter(excludeOther);
    const lightingOptions = Array.from(document.getElementById('lighting').options).filter(excludeOther);
    const poseOptions = Array.from(document.getElementById('pose').options).filter(excludeOther);
    const clothingOptions = Array.from(document.getElementById('clothing').options).filter(excludeOther);
    const backgroundOptions = Array.from(document.getElementById('background').options).filter(excludeOther);
    const qualityOptions = Array.from(document.getElementById('quality').options).filter(excludeOther);

    // Select random options
    document.getElementById('style').value = getRandomItems(styleOptions)[0].value;
    document.getElementById('lighting').value = getRandomItems(lightingOptions)[0].value;
    document.getElementById('pose').value = getRandomItems(poseOptions)[0].value;
    document.getElementById('clothing').value = getRandomItems(clothingOptions)[0].value;
    document.getElementById('background').value = getRandomItems(backgroundOptions)[0].value;
    
    // Select random quality enhancers
    const qualitySelect = document.getElementById('quality');
    Array.from(qualitySelect.options).forEach(option => option.selected = false);
    
    const randomCount = Math.floor(Math.random() * 3) + 2;
    getRandomItems(qualityOptions, randomCount).forEach(option => {
        option.selected = true;
    });

    generatePrompt();
}

// Update the existing generatePrompt function
function generatePrompt() {
    const subject = document.getElementById('subject').value;
    const style = document.getElementById('style');
    const lighting = document.getElementById('lighting');
    const pose = document.getElementById('pose');
    const clothing = document.getElementById('clothing');
    const background = document.getElementById('background');
    const nationality = document.getElementById('nationality').value;
    
    // Get values considering "Other..." inputs
    const styleValue = style.value === 'other' ? document.getElementById('otherStyle').value : style.value;
    const lightingValue = lighting.value === 'other' ? document.getElementById('otherLighting').value : lighting.value;
    const poseValue = pose.value === 'other' ? document.getElementById('otherPose').value : pose.value;
    const clothingValue = clothing.value === 'other' ? document.getElementById('otherClothing').value : clothing.value;
    const backgroundValue = background.value === 'other' ? document.getElementById('otherBackground').value : background.value;
    
    // Get selected qualities including custom ones
    let selectedQualities = Array.from(document.getElementById('quality').selectedOptions)
        .map(option => option.value === 'other' ? '' : option.value)
        .filter(Boolean);
    
    // Add other qualities if specified
    const otherQualityValue = document.getElementById('otherQuality').value;
    if (otherQualityValue) {
        const additionalQualities = otherQualityValue.split(',')
            .map(q => q.trim())
            .filter(q => q.length > 0);
        selectedQualities = selectedQualities.concat(additionalQualities);
    }

    // Combine standard details with nationality-specific details
    const combinedDetails = [
        ...details,
        ...nationalityDetails[nationality]
    ];

    // Create the prompt with deduplication
    const elements = [
        subject,
        `${poseValue}`,
        `wearing ${clothingValue}`,
        combinedDetails.join(', '),
        `natural ${styleValue} photograph in ${lightingValue}`,
        `casually captured in ${backgroundValue}`,
        technical.join(', '),
        selectedQualities.join(', ')
    ];

    // Remove duplicate words and join
    const prompt = removeDuplicateWords(elements.join(', '));
    const resultElement = document.getElementById('result');
    resultElement.value = prompt;

    // Auto copy to clipboard
    resultElement.select();
    document.execCommand('copy');

    // Visual feedback
    const copyButton = document.querySelector('.output-section button');
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy to Clipboard';
    }, 2000);
}

function removeDuplicateWords(text) {
    const words = text.toLowerCase().split(/\s+/);
    const uniqueWords = new Set();
    return words
        .filter(word => {
            if (uniqueWords.has(word)) return false;
            uniqueWords.add(word);
            return true;
        })
        .join(' ');
}

// Update the event listeners to include quality enhancers
document.addEventListener('DOMContentLoaded', function() {
    const selects = ['style', 'lighting', 'pose', 'clothing', 'background', 'quality'];
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (id === 'quality') {
            select.addEventListener('change', handleOtherQuality);
        } else {
            select.addEventListener('change', () => handleOtherOption(select));
        }
    });

    // Add event listener for mobile devices
    document.getElementById('result').addEventListener('click', function() {
        this.select();
        // For mobile devices
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(this.value)
                .then(() => {
                    const copyButton = document.querySelector('.output-section button');
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy to Clipboard';
                    }, 2000);
                });
        }
    });

    const qualitySelect = document.getElementById('quality');
    qualitySelect.title = "Hold Ctrl (Cmd on Mac) to select multiple options";
    
    // Add instruction text above the quality enhancers
    const qualityLabel = document.querySelector('label[for="quality"]');
    qualityLabel.innerHTML += ' <span style="font-weight: normal; font-size: 0.9em;">(Select multiple)</span>';
});

// Add new function to handle custom quality enhancers
function handleQualityCustomOption() {
    const qualitySelect = document.getElementById('quality');
    const customInput = document.getElementById('customQuality');
    const isCustomSelected = Array.from(qualitySelect.selectedOptions)
        .some(option => option.value === 'custom');
    
    customInput.style.display = isCustomSelected ? 'block' : 'none';
}

// Add these functions
function handleOtherOption(selectElement) {
    const otherInput = document.getElementById('other' + selectElement.id.charAt(0).toUpperCase() + selectElement.id.slice(1));
    otherInput.style.display = selectElement.value === 'other' ? 'block' : 'none';
    
    if (selectElement.value !== 'other') {
        otherInput.value = '';
    }
}

function handleOtherQuality() {
    const qualitySelect = document.getElementById('quality');
    const otherInput = document.getElementById('otherQuality');
    const isOtherSelected = Array.from(qualitySelect.selectedOptions)
        .some(option => option.value === 'other');
    
    otherInput.style.display = isOtherSelected ? 'block' : 'none';
    
    // Don't clear the input if "Other" is still selected
    if (!isOtherSelected) {
        otherInput.value = '';
    }
}

// Add this function to update the subject when nationality changes
function updateSubject() {
    const nationality = document.getElementById('nationality').value;
    const baseDescription = "Beautiful tall chubby woman with thick curves and defined muscles";
    document.getElementById('subject').value = `${baseDescription.replace('woman', `${nationality} woman`)}`;
    generatePrompt();
}

// Update the window.onload to include nationality initialization
window.onload = function() {
    // Set initial subject with default nationality (Japanese)
    updateSubject();
    generatePrompt();
};

// Add nationality-specific details
const nationalityDetails = {
    japanese: [
        "japanese beauty standards",
        "elegant asian features",
        "japanese facial features"
    ],
    korean: [
        "korean beauty standards",
        "k-beauty features",
        "korean facial features"
    ],
    chinese: [
        "chinese beauty standards",
        "traditional chinese features",
        "chinese facial features"
    ],
    malay: [
        "malay beauty standards",
        "southeast asian features",
        "malay facial features"
    ]
}; 