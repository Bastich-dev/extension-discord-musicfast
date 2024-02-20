import Actions from "./Actions";
import SelectChannel from "./SelectChannel";
import SelectPrefix from "./SelectPrefix";
import SelectServer from "./SelectServer";

export default function Form() {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}>
            <SelectPrefix />
            <SelectServer />
            <SelectChannel />
            <Actions />
        </form>
    );
}
