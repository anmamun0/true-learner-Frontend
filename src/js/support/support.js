const faqSections = document.querySelectorAll('.faq-section');

faqSections.forEach(faq => {
    faq.addEventListener('click', function () {
        const answer = this.querySelector('p');
        answer.classList.toggle('hidden');
    });
});

const tabs = document.querySelectorAll('.tab-navigation');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const activeTab = tab.getAttribute('data-tab');
        tabContents.forEach(content => {
            if (content.classList.contains(activeTab)) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

function toggleLiveChat() {
    const liveChatBox = document.getElementById('liveChatBox');
    liveChatBox.classList.toggle('active');
}