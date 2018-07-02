const MULTI_SELECT_CLASS_NAME = 'mgs-group_multiselect'
const DROPDOWN_CARET_DOWN_CLASS_NAME = 'mgs-dropdown_caret_down'
const DROPDOWN_CARET_UP_CLASS_NAME = 'mgs-dropdown_caret_up'
const DROPDOWN_BUTTON_CLASS_NAME = "mgs-group_multiselect_button"
const HIDDEN_CLASS_NAME = 'mgs-hidden'

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
	const dropdownButton = createDropdownButton(el)
	makeGroupsClickable(el)
	makeButtonTextDisplayClickedOptions(el, dropdownButton)
}

function createDropdownButton(multiselectElement,){
	const dropdownButton = document.createElement('div')
	const dropdownButtonText = document.createElement('span')
	const defaultText = multiselectElement.getAttribute('data-label')
	dropdownButton.classList = DROPDOWN_BUTTON_CLASS_NAME

	dropdownButtonText.textContent = defaultText
	const icon = document.createElement('i')
	icon.classList = DROPDOWN_CARET_DOWN_CLASS_NAME

	dropdownButton.addEventListener('click',() => {
		toggleDropdown(multiselectElement, icon)
	})

	dropdownButton.appendChild(dropdownButtonText)
	dropdownButton.appendChild(icon)
	const multiselectElementParent = multiselectElement.parentNode


	multiselectElementParent.insertBefore(dropdownButton, multiselectElement)

	// hide dropdown on it
	toggleDropdown(multiselectElement, icon)

	return dropdownButton

}
function makeGroupsClickable(el){
	const groups = el.querySelectorAll('optgroup')
	;[].forEach.call(groups, group => {
		group.addEventListener('click', (event) => {
			const target = event.target
			console.log('target tag name is', target.tagName)
			if (target.tagName.toLocaleLowerCase() !== 'optgroup') { 
				return
			}
			clickGroup(target)
		})
	})
}
function clickGroup(group){
	console.log("group is ", group)
	const options = group.querySelectorAll('option')
		console.log("options ", options)

	const hasAllOptionsSelected = [].every.call(options, option => option.selected)

	if (hasAllOptionsSelected) {
		[].forEach.call(options, option => option.selected = false)
	} else {
		[].forEach.call(options, option => option.selected = true)
	}
}

function toggleDropdown(multiselectElement, icon) {
	icon.className= icon.className.indexOf(DROPDOWN_CARET_DOWN_CLASS_NAME) > -1 ? DROPDOWN_CARET_UP_CLASS_NAME : DROPDOWN_CARET_DOWN_CLASS_NAME
	;multiselectElement.classList.contains(HIDDEN_CLASS_NAME) ? multiselectElement.classList.remove(HIDDEN_CLASS_NAME) : multiselectElement.classList.add(HIDDEN_CLASS_NAME)
}
function resizeMultiSelectElement(el) {
	console.log(		'resizeMultiSelectElement', el)
	const MAX_ITEMS_DISPLAYED_AT_ONCE = 10
	const numOptions = el.querySelectorAll('option').length
	const numGroups = el.querySelectorAll('optgroup').length
	const numRows = numOptions + numGroups
	el.size = numRows > MAX_ITEMS_DISPLAYED_AT_ONCE ? MAX_ITEMS_DISPLAYED_AT_ONCE: numRows
}

function makeButtonTextDisplayClickedOptions(multiSelectElement, button){
	const defaultText = multiSelectElement.getAttribute('data-label')

	const buttonText = button.querySelector('span')
	multiSelectElement.addEventListener('click', event => {
		const values = [].reduce.call(multiSelectElement.options, (arr, option) => {
			if (option.selected) {
				arr.push(option.value)
			}
			return arr
		}, [])
		buttonText.textContent = values.length === 0 ? defaultText : values.length + " item(s) selected"
		console.log('values', values)
	})
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