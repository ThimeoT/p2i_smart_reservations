import InstanceCard from '../../../shared/components/cards/InstanceCard';
import useAllInstances from '../../instances/hooks/useInstances';
import type { Instance } from '../../instances/types/instance.types';

export default function InstanceList() {
  const { instances, loading, error } = useAllInstances();

  if (loading) return <p>Chargement des équipements...</p>;
  if (error)
    return (
      <p>
        {error.name} : {error.message}
      </p>
    );

  return (
    <div className="flex flex-wrap gap-4">
      {instances.map((instance: Instance) => (
        <InstanceCard instance={instance} />
      ))}
    </div>
  );
}
