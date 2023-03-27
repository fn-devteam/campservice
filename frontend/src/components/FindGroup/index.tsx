import { useEffect, useState } from "react";
import { requestBackend } from "util/requests";
import { ProductGroup } from "types/productGroup";

interface FindGroupProps {
    onSelectGroup: (groupId: number) => void;
    selectedGroup?: string;
  }
  
const FindGroup = ({ onSelectGroup }: FindGroupProps) => {
  const [grupos, setGrupos] = useState<ProductGroup[]>([]);

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
    <select name="group" onChange={(event) => onSelectGroup(+event.target.value)}>
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
