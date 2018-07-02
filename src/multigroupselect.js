const MULTI_SELECT_CLASS_NAME = 'group_multiselect'
const DROPDOWN_CARET_DOWN_CLASS_NAME = 'dropdown_caret_down'
const DROPDOWN_CARET_UP_CLASS_NAME = 'dropdown_caret_up'

ready(() => {
	init()
})

function init() {
	const multiselectElements = document.querySelectorAll('.' + MULTI_SELECT_CLASS_NAME)
	;[].forEach.call(multiselectElements, makeMultiGroupSelect)
}

function makeMultiGroupSelect(el) {
	new MultiGroupSelect(el)
}
function MultiGroupSelect(el){
	// const multiselectElement = document.querySelector(selector)
	console.log('instantiating a new multiGroupSelect el', el)
	resizeMultiSelectElement(el)
	createDropdownButton(el)
}

function createDropdownButton(multiselectElement,){
	const fakeDropdown = document.createElement('div')
	fakeDropdown.classList = "group_multiselect_title"

	fakeDropdown.textContent = multiselectElement.getAttribute('data-label')
	const icon = document.createElement('i')
	icon.classList = 'dropdown_caret_down'

	fakeDropdown.addEventListener('click',() => {
		toggleDropdown(multiselectElement, icon)
	})

	fakeDropdown.appendChild(icon)
	const multiselectElementParent = multiselectElement.parentNode


	multiselectElementParent.insertBefore(fakeDropdown, multiselectElement)

	// hide dropdown on it
	toggleDropdown(multiselectElement, icon)

}

function toggleDropdown(multiselectElement, icon) {
	icon.className= icon.className.indexOf(DROPDOWN_CARET_DOWN_CLASS_NAME) > -1 ? DROPDOWN_CARET_UP_CLASS_NAME : DROPDOWN_CARET_DOWN_CLASS_NAME
	;multiselectElement.classList.contains('hidden') ? multiselectElement.classList.remove('hidden') : multiselectElement.classList.add('hidden')
}
function resizeMultiSelectElement(el) {
	console.log(		'resizeMultiSelectElement', el)
	const MAX_ITEMS_DISPLAYED_AT_ONCE = 10
	const numOptions = el.querySelectorAll('option').length
	const numGroups = el.querySelectorAll('optgroup').length
	const numRows = numOptions + numGroups
	el.size = numRows > MAX_ITEMS_DISPLAYED_AT_ONCE ? MAX_ITEMS_DISPLAYED_AT_ONCE: numRows
}


function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}