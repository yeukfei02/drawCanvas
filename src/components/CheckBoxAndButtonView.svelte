<script lang="ts">
    import { addSquareCheckedStore, addCircleCheckedStore, addFlagCheckedStore } from '../store';

    export let addSquareChecked: any;
    export let addCircleChecked: any;
    export let addFlagChecked: any;

    export let canvas: any;

    const handleAddSquareChecked = () => {
        if (!addSquareChecked) {
            addSquareCheckedStore.set(true);
            addCircleCheckedStore.set(false);
            addFlagCheckedStore.set(false);
        } else {
            addSquareCheckedStore.set(false);
            addCircleCheckedStore.set(false);
            addFlagCheckedStore.set(false);
        }
    }

    const handleAddCircleChecked = () => {
        if (!addCircleChecked) {
            addSquareCheckedStore.set(false);
            addCircleCheckedStore.set(true);
            addFlagCheckedStore.set(false);
        } else {
            addSquareCheckedStore.set(false);
            addCircleCheckedStore.set(false);
            addFlagCheckedStore.set(false);
        }
    }

    const handleAddFlagChecked = () => {
        if (!addFlagChecked) {
            addSquareCheckedStore.set(false);
            addCircleCheckedStore.set(false);
            addFlagCheckedStore.set(true);
        } else {
            addSquareCheckedStore.set(false);
            addCircleCheckedStore.set(false);
            addFlagCheckedStore.set(false);
        }
    }

    const handleClearButtonClick = () => {
        const context = canvas.getContext('2d');

        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.closePath();

        canvas.setAttribute('style', 'background-color: white');

        addSquareCheckedStore.set(false);
        addCircleCheckedStore.set(false);
        addFlagCheckedStore.set(false);
    }
</script>

<style>

</style>

<div>
    <div class="d-flex flex-row justify-content-center align-items-center my-4">
        <div class="mx-3">
            <input class="form-check-input" type="checkbox" value="" id="addSquare" checked={addSquareChecked} on:click={handleAddSquareChecked}>
            <label class="form-check-label" for="addSquare">
                Add square
            </label>
        </div>
        <div class="mx-3">
            <input class="form-check-input" type="checkbox" value="" id="addCircle" checked={addCircleChecked} on:click={handleAddCircleChecked}>
            <label class="form-check-label" for="addCircle">
                Add circle
            </label>
        </div>
        <div class="mx-3">
            <input class="form-check-input" type="checkbox" value="" id="addFlag" checked={addFlagChecked} on:click={handleAddFlagChecked}>
            <label class="form-check-label" for="addFlag">
                Add flag
            </label>
        </div>
    </div>

    <div class="d-flex justify-content-center my-4">
        <button type="button" class="btn btn-danger" on:click={handleClearButtonClick}>Clear</button>
    </div>

    <div style="margin: 1em auto; visibility: hidden;">test</div>
</div>