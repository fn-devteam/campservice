import { useEffect, useState } from "react";
import { requestBackend } from "util/requests";
import { ProductGroup } from "types/productGroup";

interface FindGroupProps {
    onSelectGroup: (group: ProductGroup | null) => void;
    selectedGroup: ProductGroup | null;
    className?: string
  }
  
const FindGroup = (props: FindGroupProps) => {
  const [grupos, setGrupos] = useState<ProductGroup[]>([]);

  const handleSelectGroup = (groupId: number) => {
    const selectedGroup = grupos.find(g => g.id === groupId) || null
    props.onSelectGroup(selectedGroup);
  }

  useEffect(() => {
    const config = {
      method: 'GET',
      url: '/product_groups',
    };

    requestBackend(config).then((response) => {
      setGrupos(response.data.content);
    });
  }, []);

  return (
    <select 
    name="group" 
    onChange={(event) => handleSelectGroup(+event.target.value)}
    value={props.selectedGroup?.id}
    className={props.className}
    >
      <option value="">Selecione um grupo</option>
      {grupos.map((grupo) => (
        <option key={grupo.id} value={grupo.id}>
          {grupo.groupName}
        </option>
      ))}
        {console.log(grupos)}

    </select>
  );
};

export default FindGroup;
