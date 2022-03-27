import BluegymAutocomplete from "../../../../components/bluegymAutocomplete";
import useExercise from "../../../../effects/useExercise";

export default function AutocompleteExercise({ trainer, handleClick }) {
  const { data, loading, error } = useExercise(trainer?.id);
  return (
    <>
      <BluegymAutocomplete
        loading={loading}
        placeholder="운동을 선택해주세요"
        options={data}
        onChange={handleClick}
        // onChange={handleChange}
        getOptionLabel={({ name }) => name}
        // onClose={(e) => console.log("close", e)}
      />
    </>
  );
}
