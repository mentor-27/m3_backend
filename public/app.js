document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'edit') {
    switchBtns(target, target.dataset.type);
  } else if (target.dataset.type === 'save') {
    const newTitle = target.parentNode.previousElementSibling.textContent;
    const id = target.dataset.id;

    if (newTitle) {
      edit(id, newTitle).then(() => {
        switchBtns(target, target.dataset.type);
        target.parentNode.previousElementSibling.textContent = newTitle;
      });
    }
  } else if (target.dataset.type === 'remove') {
    const id = target.dataset.id;
    remove(id).then(() => {
      target.closest('li').remove();
    });
  } else if (target.dataset.type === 'cancel') {
    switchBtns(target, target.dataset.type);
  }
});

function switchBtns(target, type) {
  switch (type) {
    case 'edit':
      {
        target.dataset.type = 'save';
        target.classList.remove('btn-primary');
        target.classList.add('btn-success');
        target.textContent = 'Сохранить';
        target.nextElementSibling.dataset.type = 'cancel';
        target.nextElementSibling.textContent = 'Отменить';
        target.parentNode.previousElementSibling.contentEditable = true;
      }
      break;
    case 'save':
      {
        target.dataset.type = 'edit';
        target.classList.remove('btn-success');
        target.classList.add('btn-primary');
        target.textContent = 'Обновить';
        target.nextElementSibling.dataset.type = 'remove';
        target.nextElementSibling.textContent = '\u00d7';
        target.parentNode.previousElementSibling.contentEditable = false;
      }
      break;
    case 'cancel': {
      target.dataset.type = 'remove';
      target.textContent = '\u00d7';
      target.previousElementSibling.dataset.type = 'edit';
      target.previousElementSibling.classList.remove('btn-success');
      target.previousElementSibling.classList.add('btn-primary');
      target.previousElementSibling.textContent = 'Обновить';
      target.parentNode.previousElementSibling.contentEditable = false;
    }
    default:
      break;
  }
}

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function edit(id, newTitle) {
  await fetch(`/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ id, title: newTitle }),
  });
}
