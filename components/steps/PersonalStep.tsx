'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPersonalInfo } from '@/store/slices/resumeSlice';

export default function PersonalStep() {
  const dispatch = useAppDispatch();

  const personal = useAppSelector(
    (state) => state.resume.personal
  );

  const updateField = (field: string, value: string) => {
    dispatch(
      setPersonalInfo({
        ...personal,
        [field]: value,
      })
    );
  };

  const addSocialLink = () => {
    dispatch(
      setPersonalInfo({
        ...personal,
        socialLinks: [
          ...(personal.socialLinks || []),
          {
            label: '',
            url: '',
          },
        ],
      })
    );
  };

  const updateSocialLink = (
    index: number,
    key: 'label' | 'url',
    value: string
  ) => {
    const updated = [...(personal.socialLinks || [])];

    updated[index] = {
      ...updated[index],
      [key]: value,
    };

    dispatch(
      setPersonalInfo({
        ...personal,
        socialLinks: updated,
      })
    );
  };

  const removeSocialLink = (index: number) => {
    const updated = [...(personal.socialLinks || [])];
    updated.splice(index, 1);

    dispatch(
      setPersonalInfo({
        ...personal,
        socialLinks: updated,
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <h2 className="text-lg font-semibold">
        Personal Information
      </h2>

      {/* MAIN INFO */}
      <Card className="p-4 space-y-3">

        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="First Name"
            value={personal.firstName}
            onChange={(e) =>
              updateField('firstName', e.target.value)
            }
          />

          <Input
            placeholder="Last Name"
            value={personal.lastName}
            onChange={(e) =>
              updateField('lastName', e.target.value)
            }
          />
        </div>

        <Input
          placeholder="Email"
          value={personal.email}
          onChange={(e) =>
            updateField('email', e.target.value)
          }
        />

        <Input
          placeholder="Phone"
          value={personal.phone}
          onChange={(e) =>
            updateField('phone', e.target.value)
          }
        />

        <Input
          placeholder="Address (optional)"
          value={personal.address || ''}
          onChange={(e) =>
            updateField('address', e.target.value)
          }
        />

        <textarea
          className="w-full border rounded p-2 text-sm"
          rows={4}
          placeholder="Professional Summary"
          value={personal.summary}
          onChange={(e) =>
            updateField('summary', e.target.value)
          }
        />
      </Card>

      {/* SOCIAL LINKS */}
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Social Links</h3>

        <Button onClick={addSocialLink}>
          Add Link
        </Button>
      </div>

      <div className="space-y-3">
        {(personal.socialLinks || []).map((link, index) => (
          <Card key={index} className="p-3 space-y-2">

            <Input
              placeholder="Label (e.g. LinkedIn, Portfolio)"
              value={link.label}
              onChange={(e) =>
                updateSocialLink(
                  index,
                  'label',
                  e.target.value
                )
              }
            />

            <Input
              placeholder="URL"
              value={link.url}
              onChange={(e) =>
                updateSocialLink(
                  index,
                  'url',
                  e.target.value
                )
              }
            />

            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() =>
                  removeSocialLink(index)
                }
              >
                Remove
              </Button>
            </div>

          </Card>
        ))}
      </div>
    </div>
  );
}