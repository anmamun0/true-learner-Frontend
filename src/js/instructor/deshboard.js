// side nav var control

function showContent(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content').forEach((section) => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
}



//  account setting

// Toggle function to show/hide nested menu
       // Function to toggle visibility of nested menu
       const toggleSubMenu = () => {
        const menu = document.getElementById('account-settings-menu');
        menu.classList.toggle('hidden');
    }

    // Show the nested menu when the account setting button is clicked
    document.getElementById('account_setting_button').addEventListener('click', (event) => {
        const menu = document.getElementById('account-settings-menu');
        menu.classList.toggle('hidden');
    });

    // Hide the nested menu when clicking anywhere outside of the sidebar or button
    document.addEventListener('click', (event) => {
        const menu = document.getElementById('account-settings-menu');
        const button = document.getElementById('account_setting_button');
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.classList.add('hidden');
        }
    });