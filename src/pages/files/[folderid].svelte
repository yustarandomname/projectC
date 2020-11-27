<script>
  import SearchQuery from "./../../_components/filter/SearchQuery.svelte";
  import HoverContainer from "./../../_components/containers/HoverContainer.svelte";
  import firebase from "firebase/app";
  import "firebase/auth";

  import PopUpForm from "./../../_components/forms/PopupForm.svelte";
  import LimitsizeGrid from "../../_components/grids/LimitsizeGrid.svelte";
  import Container from "./../../_components/containers/Container.svelte";
  import FullsizeContainer from "./../../_components/containers/FullsizeContainer.svelte";
  import Login from "./../../_components/authentication/Login.svelte";

  import { notifications } from "./../../_stores/notificationStore.js";
  import { FirebaseApp, Collection, User } from "sveltefire";
  import { sidePanel } from "./../../_stores/headerStore.js";
  import { goto } from "@sveltech/routify";

  export let folderid = "home";

  sidePanel.remove();
  let form = {};
  let hoveringOverFolder = null;
  let fileBeingDragged = null;

  const fileContext = file => {
    return {
      isVisible: false,
      fields: {
        Duplicate: () => {
          console.log(`duplicate ${file.title}`);
        },
        Rename: () => {
          console.log(`update ${file.title}`);
        },
        Delete: () => {
          console.log(`delete ${file.title}`);
        }
      }
    };
  };

  function createFolder() {
    form = {
      header: "Create file",
      fields: {
        Title: {
          type: "text",
          required: true
        },
        "Create folder": {
          type: "submit",
          onSubmit: () => createNewFolder()
        }
      }
    };
  }

  function createFile() {
    form = {
      header: "Create file",
      fields: {
        Title: {
          type: "text",
          required: true
        },
        "File type": {
          type: "radio",
          items: ["note", "todo", "presentation", "drawing"],
          value: "note"
        },
        "Create file": {
          type: "submit",
          onSubmit: () => createNewFile()
        }
      }
    };
  }

  function createNewFolder() {
    firebase
      .firestore()
      .collection(`users/${firebase.auth().currentUser.uid}/files`)
      .add({
        type: "folder",
        files: 0,
        title: form.fields["Title"].value,
        inFolder: folderid
      })
      .then(() => {
        notifications.succes("Succesfully created file");
        form = {};
      });
  }

  function createNewFile() {
    firebase
      .firestore()
      .collection(`users/${firebase.auth().currentUser.uid}/files`)
      .add({
        type: form.fields["File type"].value,
        blocks: 0,
        title: form.fields["Title"].value,
        inFolder: folderid
      })
      .then(() => {
        notifications.succes("Succesfully created file");
        form = {};
      });
  }

  function dragStart(event, file) {}

  function drop(event, folder) {
    event.preventDefault();

    if (fileBeingDragged) {
      fileBeingDragged.ref.update({
        inFolder: folder.id
      });
      fileBeingDragged = null;
    }

    hoveringOverFolder = null;
  }
</script>

<style>
  .folder {
    border: 2px solid white;
    border-radius: 0.5rem;
  }

  .hoveringOverFolder {
    border-color: var(--secondary);
  }
</style>

<FirebaseApp {firebase}>
  <User let:user on:user>
    <Collection
      path={`users/${user.uid}/files`}
      query={ref => ref
          .where('type', '==', 'folder')
          .where('inFolder', '==', folderid || 'home')}
      let:data={folders}>

      <!-- FOLDERS -->
      <LimitsizeGrid>
        <SearchQuery items={folders} filterOn={'title'} let:item={folder}>
          <div
            class="folder"
            class:hoveringOverFolder={hoveringOverFolder === folder.id}
            on:dragenter={() => (hoveringOverFolder = folder.id)}
            on:dragleave={() => (hoveringOverFolder = null)}
            on:drop={event => drop(event, folder)}
            ondragover="return false">

            <HoverContainer
              on:click={() => $goto(`/files/${folder.id}`)}
              ratio={0.5}>
              <div slot="title">{folder.title}</div>
            </HoverContainer>
          </div>
        </SearchQuery>

        <HoverContainer
          on:click={createFolder}
          background={'var(--green)'}
          ratio={0.5}>
          <div slot="title">Create folder</div>
        </HoverContainer>
      </LimitsizeGrid>
    </Collection>

    <!-- FILES -->
    <Collection
      path={`users/${user.uid}/files`}
      query={ref => ref
          .where('type', 'in', ['note', 'presentation', 'drawing', 'todo'])
          .where('inFolder', '==', folderid || 'home')}
      let:data={files}>

      <LimitsizeGrid>
        <div slot="title">Files</div>

        <SearchQuery items={files} filterOn={'title'} let:item={file}>
          <div draggable={true} on:dragstart={() => (fileBeingDragged = file)}>
            <HoverContainer
              contextMenu={fileContext(file)}
              on:click={() => $goto(`/files/${file.type}/${user.uid}/${file.id}`)}>
              <div slot="title">{file.title}</div>
            </HoverContainer>
          </div>
        </SearchQuery>

        <HoverContainer on:click={createFile} background={'var(--green)'}>
          <div slot="title">Create file</div>
        </HoverContainer>
      </LimitsizeGrid>
    </Collection>

    <div slot="signed-out">
      <Login />
    </div>
  </User>
</FirebaseApp>

<PopUpForm {form} />
