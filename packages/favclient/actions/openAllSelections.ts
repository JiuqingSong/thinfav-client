import forEachGroup from '../utils/forEachGroup';

function openAllSelections() {
    forEachGroup(group =>
        group.items.forEach(item => {
            if (item.checked) {
                window.open(item.url);
            }
        })
    );
}

export default openAllSelections;
